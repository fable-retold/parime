const libFableServiceBase = require('fable-serviceproviderbase');
const libParimeBinaryStorage = require('./Parime-BinaryStorage.js');
const libAdapterFilesystem = require('./adapters/Parime-Adapter-Filesystem.js');
const libFS = require('fs');
const libPath = require('path');
const libStream = require('stream');

/**
 * Parime-TieredBinaryStorage -- a local filesystem CACHE in front of a durable
 * external backend (the system of record).
 *
 * It exposes the SAME interface as ParimeBinaryStorage (write / read / readStream
 * / stat / exists / delete / listKeys), so every caller keeps working unchanged;
 * it just decides whether a blob is served from the local cache or fetched from
 * the durable tier. The durable tier is any ParimeExternalStorageAdapter
 * (filesystem / NFS / SMB today, S3 / R2 next), chosen by configuration.
 *
 * Read path (read-through): a cache hit serves from local disk and never touches
 * the backend. A miss fetches from the backend, streams it into the cache, then
 * serves it; later reads are local. So the backend is hit only on a miss.
 *
 * Write path (configurable):
 *   - write-through (default): put to the durable backend first (durable before
 *     the write is acknowledged), then keep a local cache copy. Safe: the system
 *     of record always has the bytes.
 *   - write-back: write the cache copy and acknowledge immediately, then push to
 *     the backend asynchronously. Faster, with a small window where only the
 *     cache has the bytes; such blobs are marked dirty and never evicted until the
 *     push lands.
 *
 * The cache is bounded by a byte budget (Cache.MaxBytes). When it crosses the
 * high-water mark, the least valuable blobs are evicted from local disk (never
 * from the durable tier) down to the low-water mark, scored by recency (lru) or
 * recency-and-frequency (lrfu).
 *
 * Default / no backend: with Type 'none' (or no backend configured) this behaves
 * exactly like a plain local ParimeBinaryStorage -- every operation is cache-only
 * -- so the zero-config path is byte-for-byte what it has always been.
 *
 * Configuration comes from fable.settings.ParimeDurableBackend (or pOptions.Backend),
 * and pOptions.Adapter can inject an adapter instance directly (used by tests):
 *   {
 *     Type: 'filesystem' | 's3' | 'none',
 *     WriteMode: 'write-through' | 'write-back',
 *     Cache: { MaxBytes: 0, HighWater: 0.9, LowWater: 0.7, Score: 'lru' | 'lrfu' },
 *     Filesystem: { Root: '...' },
 *     S3: { Endpoint, Bucket, Region, AccessKeyId, SecretAccessKey, Prefix }
 *   }
 *
 * @author Steven Velozo <steven@velozo.com>
 * @license MIT
 */
const _DefaultCache = (
	{
		MaxBytes: 0,       // 0 = unbounded (no eviction)
		HighWater: 0.9,    // start evicting above this fraction of MaxBytes
		LowWater: 0.7,     // evict down to this fraction
		Score: 'lru'       // 'lru' or 'lrfu'
	});

class ParimeTieredBinaryStorage extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.serviceType = 'ParimeTieredBinaryStorage';

		let tmpOptions = this.options || {};
		let tmpBackendConfig = tmpOptions.Backend || this.fable.settings.ParimeDurableBackend || {};
		this.backendConfig = tmpBackendConfig;

		this.writeMode = (tmpBackendConfig.WriteMode === 'write-back') ? 'write-back' : 'write-through';
		this.cacheConfig = Object.assign({}, _DefaultCache, tmpBackendConfig.Cache || {});

		// The cache tier is a plain local ParimeBinaryStorage (the existing, sharded FS store).
		this.cache = new libParimeBinaryStorage(this.fable, {}, 'ParimeTieredCacheTier');

		// The durable tier: an injected adapter instance (tests) or one built from config.
		this.durable = (tmpOptions.Adapter)
			? tmpOptions.Adapter
			: this._buildAdapter(tmpBackendConfig);

		// Eviction index, keyed by the cache file's absolute path:
		//   path -> { Size, LastAccess, Hits, Dirty }
		// Keying on the resolved path avoids reconstructing (category, hash) from a
		// sharded directory tree, and lets eviction unlink the file directly.
		this._index = new Map();
		this._cachedBytes = 0;
		this._evicting = false;
	}

	// Build the durable adapter from config. 'none' (or unknown) yields null, which
	// puts the tiered store in cache-only mode (identical to plain local storage).
	_buildAdapter(pConfig)
	{
		let tmpType = String((pConfig && pConfig.Type) || 'none').toLowerCase();
		switch (tmpType)
		{
			case 'none':
			case '':
				return null;
			case 'filesystem':
			case 'fs':
				return new libAdapterFilesystem(this.fable, pConfig.Filesystem || {}, 'ParimeDurableFilesystem');
			case 's3':
			case 'r2':
			{
				// Lazy require so the module loads even before the S3 adapter ships.
				let libAdapterS3;
				try { libAdapterS3 = require('./adapters/Parime-Adapter-S3.js'); }
				catch (pError) { throw new Error('Parime durable backend Type "s3" is configured but the S3 adapter is not available: ' + pError.message); }
				return new libAdapterS3(this.fable, pConfig.S3 || {}, 'ParimeDurableS3');
			}
			default:
				throw new Error(`Parime durable backend Type "${pConfig.Type}" is not recognized.`);
		}
	}

	initialize(fCallback)
	{
		let tmpSelf = this;
		this.cache.initialize(
			(pCacheError) =>
			{
				if (pCacheError) { return fCallback(pCacheError); }
				if (!tmpSelf.durable)
				{
					tmpSelf.fable.log.info('Parime tiered storage initialized in cache-only mode (no durable backend configured).');
					tmpSelf._seedIndexFromDisk();
					return fCallback();
				}
				tmpSelf.durable.initialize(
					(pDurableError) =>
					{
						if (pDurableError) { return fCallback(pDurableError); }
						tmpSelf._seedIndexFromDisk();
						tmpSelf.fable.log.info(`Parime tiered storage initialized: cache + durable [${tmpSelf.durable.adapterType}], write mode [${tmpSelf.writeMode}], cache budget [${tmpSelf.cacheConfig.MaxBytes || 'unbounded'}] bytes, ${tmpSelf._index.size} cached object(s) (${tmpSelf._cachedBytes} bytes).`);
						return fCallback();
					});
			});
	}

	// The durable object key for a (category, hash). Object stores are flat with
	// prefixes, so the cache's shard directories are not mirrored remotely.
	durableKey(pCategory, pHash)
	{
		return `${pCategory}/${pHash}`;
	}

	// ---- index / eviction bookkeeping ----

	_cachePath(pCategory, pHash)
	{
		return this.cache.resolvePath(pCategory, pHash);
	}

	_indexTouch(pPath)
	{
		let tmpEntry = this._index.get(pPath);
		if (tmpEntry)
		{
			tmpEntry.LastAccess = Date.now();
			tmpEntry.Hits = tmpEntry.Hits + 1;
		}
	}

	_indexUpsert(pPath, pSize, pDirty)
	{
		let tmpEntry = this._index.get(pPath);
		if (tmpEntry)
		{
			this._cachedBytes = this._cachedBytes - tmpEntry.Size + pSize;
			tmpEntry.Size = pSize;
			tmpEntry.LastAccess = Date.now();
			tmpEntry.Hits = tmpEntry.Hits + 1;
			if (typeof(pDirty) === 'boolean') { tmpEntry.Dirty = pDirty; }
			return;
		}
		this._index.set(pPath, { Size: pSize, LastAccess: Date.now(), Hits: 1, Dirty: !!pDirty });
		this._cachedBytes = this._cachedBytes + pSize;
	}

	_indexForget(pPath)
	{
		let tmpEntry = this._index.get(pPath);
		if (tmpEntry)
		{
			this._cachedBytes = this._cachedBytes - tmpEntry.Size;
			this._index.delete(pPath);
		}
	}

	// Seed the eviction index from the cache directory on startup so the byte total
	// reflects what is actually on disk (otherwise the budget would not bound a cache
	// that survived a restart). Best-effort and synchronous; a failure is non-fatal.
	_seedIndexFromDisk()
	{
		this._index = new Map();
		this._cachedBytes = 0;
		let tmpRoot = this.cache.storageRoot;
		let tmpSelf = this;

		let fWalk = (pDirPath) =>
		{
			let tmpEntries;
			try { tmpEntries = libFS.readdirSync(pDirPath, { withFileTypes: true }); }
			catch (pError) { return; }
			for (let i = 0; i < tmpEntries.length; i++)
			{
				let tmpEntry = tmpEntries[i];
				let tmpFull = libPath.join(pDirPath, tmpEntry.name);
				if (tmpEntry.isDirectory()) { fWalk(tmpFull); }
				else if (tmpEntry.isFile())
				{
					try
					{
						let tmpStat = libFS.statSync(tmpFull);
						tmpSelf._index.set(tmpFull, { Size: tmpStat.size, LastAccess: tmpStat.mtimeMs, Hits: 0, Dirty: false });
						tmpSelf._cachedBytes = tmpSelf._cachedBytes + tmpStat.size;
					}
					catch (pError) { /* skip a file that vanished mid-scan */ }
				}
			}
		};

		try { if (libFS.existsSync(tmpRoot)) { fWalk(tmpRoot); } }
		catch (pError) { this.fable.log.warn(`Parime tiered storage could not seed its cache index: ${pError.message}`); }
	}

	_scoreFor(pEntry, pNow)
	{
		if (this.cacheConfig.Score === 'lrfu')
		{
			// Recency and frequency: a blob read often and recently scores high and is
			// evicted last. Lower score is evicted first.
			let tmpAgeSeconds = Math.max(0, (pNow - pEntry.LastAccess) / 1000);
			return (pEntry.Hits + 1) / (tmpAgeSeconds + 1);
		}
		// Default 'lru': least-recently-accessed is evicted first.
		return pEntry.LastAccess;
	}

	// Evict cold cache files (never the durable copy, never a dirty/unflushed blob)
	// down to the low-water mark when the cache exceeds the high-water mark. Runs
	// asynchronously so it never blocks a write or read acknowledgement.
	_maybeEvict()
	{
		let tmpMax = Number(this.cacheConfig.MaxBytes) || 0;
		if (tmpMax <= 0) { return; }
		if (this._evicting) { return; }
		if (this._cachedBytes <= (tmpMax * this.cacheConfig.HighWater)) { return; }

		this._evicting = true;
		let tmpNow = Date.now();
		let tmpTarget = tmpMax * this.cacheConfig.LowWater;

		let tmpCandidates = [];
		this._index.forEach((pEntry, pPath) =>
		{
			if (!pEntry.Dirty) { tmpCandidates.push({ Path: pPath, Score: this._scoreFor(pEntry, tmpNow) }); }
		});
		tmpCandidates.sort((pA, pB) => pA.Score - pB.Score);

		let tmpSelf = this;
		let tmpIndex = 0;

		let fEvictNext = () =>
		{
			if ((tmpSelf._cachedBytes <= tmpTarget) || (tmpIndex >= tmpCandidates.length))
			{
				tmpSelf._evicting = false;
				return;
			}
			let tmpPath = tmpCandidates[tmpIndex].Path;
			tmpIndex = tmpIndex + 1;
			// The entry may have changed (re-read, or marked dirty) since we snapshotted; re-check.
			let tmpEntry = tmpSelf._index.get(tmpPath);
			if (!tmpEntry || tmpEntry.Dirty) { return fEvictNext(); }
			libFS.unlink(tmpPath,
				(pError) =>
				{
					if (pError && (pError.code !== 'ENOENT'))
					{
						tmpSelf.fable.log.warn(`Parime tiered storage eviction could not remove [${tmpPath}]: ${pError.message}`);
					}
					else
					{
						tmpSelf._indexForget(tmpPath);
					}
					return fEvictNext();
				});
		};

		fEvictNext();
	}

	// ---- read-through ----

	// Ensure a blob is present in the local cache, fetching it from the durable tier
	// on a miss. Callback is (pError, pFound).
	_ensureCached(pCategory, pHash, fCallback)
	{
		let tmpSelf = this;
		let tmpCachePath = this._cachePath(pCategory, pHash);

		this.cache.exists(pCategory, pHash,
			(pExistsError, pExists) =>
			{
				if (pExistsError) { return fCallback(pExistsError); }
				if (pExists)
				{
					tmpSelf._indexTouch(tmpCachePath);
					return fCallback(null, true);
				}
				// Cache miss. With no durable tier there is nothing to fetch.
				if (!tmpSelf.durable) { return fCallback(null, false); }

				let tmpKey = tmpSelf.durableKey(pCategory, pHash);

				// Stream from the durable tier into the cache when the backend supports
				// streaming (so large media is not buffered in memory); otherwise fall
				// back to a buffered get.
				if (tmpSelf.durable.capabilities && tmpSelf.durable.capabilities().Stream)
				{
					return tmpSelf.durable.getStream(tmpKey, {},
						(pStreamError, pStream) =>
						{
							if (pStreamError) { return fCallback(pStreamError); }
							if (!pStream) { return fCallback(null, false); }
							return tmpSelf._populateFromStream(pCategory, pHash, pStream, fCallback);
						});
				}

				return tmpSelf.durable.get(tmpKey,
					(pGetError, pBuffer) =>
					{
						if (pGetError) { return fCallback(pGetError); }
						if (!pBuffer) { return fCallback(null, false); }
						return tmpSelf.cache.write(pCategory, pHash, pBuffer,
							(pWriteError) =>
							{
								if (pWriteError) { return fCallback(pWriteError); }
								tmpSelf._indexUpsert(tmpCachePath, pBuffer.length, false);
								tmpSelf._maybeEvict();
								return fCallback(null, true);
							});
					});
			});
	}

	// Stream durable bytes into a cache temp file, then atomically rename into place.
	_populateFromStream(pCategory, pHash, pSourceStream, fCallback)
	{
		let tmpSelf = this;
		let tmpFinalPath = this._cachePath(pCategory, pHash);
		let tmpDir = libPath.dirname(tmpFinalPath);
		let tmpTempPath = `${tmpFinalPath}.tmp-${process.pid}-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

		try
		{
			if (!libFS.existsSync(tmpDir)) { libFS.mkdirSync(tmpDir, { recursive: true }); }
		}
		catch (pError) { return fCallback(pError); }

		let tmpWriteStream = libFS.createWriteStream(tmpTempPath);
		let tmpFinished = false;
		let fFail = (pError) =>
		{
			if (tmpFinished) { return; }
			tmpFinished = true;
			libFS.unlink(tmpTempPath, () => {});
			return fCallback(pError);
		};

		pSourceStream.on('error', fFail);
		tmpWriteStream.on('error', fFail);
		tmpWriteStream.on('finish',
			() =>
			{
				if (tmpFinished) { return; }
				tmpFinished = true;
				libFS.rename(tmpTempPath, tmpFinalPath,
					(pRenameError) =>
					{
						if (pRenameError) { libFS.unlink(tmpTempPath, () => {}); return fCallback(pRenameError); }
						libFS.stat(tmpFinalPath,
							(pStatError, pStat) =>
							{
								let tmpSize = (pStat) ? pStat.size : 0;
								tmpSelf._indexUpsert(tmpFinalPath, tmpSize, false);
								tmpSelf._maybeEvict();
								return fCallback(null, true);
							});
					});
			});

		pSourceStream.pipe(tmpWriteStream);
	}

	read(pCategory, pHash, fCallback)
	{
		let tmpSelf = this;
		this._ensureCached(pCategory, pHash,
			(pError, pFound) =>
			{
				if (pError) { return fCallback(pError); }
				if (!pFound) { return fCallback(null, null); }
				return tmpSelf.cache.read(pCategory, pHash, fCallback);
			});
	}

	// Returns a readable stream synchronously (matching ParimeBinaryStorage), but it
	// is a PassThrough that is fed once the blob is confirmed in the cache (fetching
	// from the durable tier first on a miss). Byte ranges apply to the cached copy.
	readStream(pCategory, pHash, pOptions)
	{
		let tmpSelf = this;
		let tmpPassThrough = new libStream.PassThrough();

		this._ensureCached(pCategory, pHash,
			(pError, pFound) =>
			{
				if (pError) { return tmpPassThrough.destroy(pError); }
				if (!pFound)
				{
					let tmpMissing = new Error(`Parime tiered storage: no object for category [${pCategory}] hash [${pHash}].`);
					tmpMissing.code = 'ENOENT';
					return tmpPassThrough.destroy(tmpMissing);
				}
				let tmpCacheStream = tmpSelf.cache.readStream(pCategory, pHash, pOptions);
				tmpCacheStream.on('error', (pStreamError) => tmpPassThrough.destroy(pStreamError));
				tmpCacheStream.pipe(tmpPassThrough);
			});

		return tmpPassThrough;
	}

	// ---- write-through / write-back ----

	write(pCategory, pHash, pBuffer, fCallback)
	{
		let tmpSelf = this;
		let tmpCachePath = this._cachePath(pCategory, pHash);
		let tmpSize = (pBuffer && pBuffer.length) ? pBuffer.length : 0;

		// Cache-only mode: behave exactly like plain local storage.
		if (!this.durable)
		{
			return this.cache.write(pCategory, pHash, pBuffer,
				(pError) =>
				{
					if (pError) { return fCallback(pError); }
					tmpSelf._indexUpsert(tmpCachePath, tmpSize, false);
					tmpSelf._maybeEvict();
					return fCallback();
				});
		}

		let tmpKey = this.durableKey(pCategory, pHash);

		if (this.writeMode === 'write-back')
		{
			// Write the cache copy and acknowledge now; push to durable asynchronously.
			// The blob is marked dirty so it is never evicted before the push lands.
			return this.cache.write(pCategory, pHash, pBuffer,
				(pCacheError) =>
				{
					if (pCacheError) { return fCallback(pCacheError); }
					tmpSelf._indexUpsert(tmpCachePath, tmpSize, true);
					fCallback();
					setImmediate(
						() =>
						{
							tmpSelf.durable.put(tmpKey, pBuffer, { Size: tmpSize },
								(pPutError) =>
								{
									if (pPutError)
									{
										tmpSelf.fable.log.error(`Parime tiered storage write-back push failed for [${tmpKey}]; it stays dirty in cache: ${pPutError.message}`, pPutError);
										return;
									}
									let tmpEntry = tmpSelf._index.get(tmpCachePath);
									if (tmpEntry) { tmpEntry.Dirty = false; }
									tmpSelf._maybeEvict();
								});
						});
				});
		}

		// write-through (default): durable first, then the cache copy.
		return this.durable.put(tmpKey, pBuffer, { Size: tmpSize },
			(pPutError) =>
			{
				if (pPutError) { return fCallback(pPutError); }
				tmpSelf.cache.write(pCategory, pHash, pBuffer,
					(pCacheError) =>
					{
						// The durable write is the ack; a cache-copy failure is logged, not fatal.
						if (pCacheError)
						{
							tmpSelf.fable.log.warn(`Parime tiered storage stored [${tmpKey}] durably but could not cache it locally: ${pCacheError.message}`);
							return fCallback();
						}
						tmpSelf._indexUpsert(tmpCachePath, tmpSize, false);
						tmpSelf._maybeEvict();
						return fCallback();
					});
			});
	}

	// ---- metadata / lifecycle ----

	stat(pCategory, pHash, fCallback)
	{
		let tmpSelf = this;
		this.cache.stat(pCategory, pHash,
			(pCacheError, pCacheStat) =>
			{
				if (pCacheError) { return fCallback(pCacheError); }
				if (pCacheStat) { return fCallback(null, pCacheStat); }
				if (!tmpSelf.durable) { return fCallback(null, null); }
				tmpSelf.durable.head(tmpSelf.durableKey(pCategory, pHash),
					(pHeadError, pHead) =>
					{
						if (pHeadError) { return fCallback(pHeadError); }
						if (!pHead || !pHead.Exists) { return fCallback(null, null); }
						// A lightweight, fs.Stats-like projection: callers use .size and isFile().
						return fCallback(null, { size: pHead.Size, Remote: true, isFile: () => true, isDirectory: () => false });
					});
			});
	}

	exists(pCategory, pHash, fCallback)
	{
		let tmpSelf = this;
		this.cache.exists(pCategory, pHash,
			(pCacheError, pExists) =>
			{
				if (pCacheError) { return fCallback(pCacheError); }
				if (pExists) { return fCallback(null, true); }
				if (!tmpSelf.durable) { return fCallback(null, false); }
				tmpSelf.durable.head(tmpSelf.durableKey(pCategory, pHash),
					(pHeadError, pHead) =>
					{
						if (pHeadError) { return fCallback(pHeadError); }
						return fCallback(null, !!(pHead && pHead.Exists));
					});
			});
	}

	// Delete the blob from BOTH tiers. Deciding WHEN to delete (reference counting /
	// garbage collection under content-addressed dedup) is the caller's concern.
	delete(pCategory, pHash, fCallback)
	{
		let tmpSelf = this;
		let tmpCachePath = this._cachePath(pCategory, pHash);
		this.cache.delete(pCategory, pHash,
			(pCacheError) =>
			{
				if (pCacheError) { return fCallback(pCacheError); }
				tmpSelf._indexForget(tmpCachePath);
				if (!tmpSelf.durable) { return fCallback(); }
				tmpSelf.durable.delete(tmpSelf.durableKey(pCategory, pHash), fCallback);
			});
	}

	// List the hashes stored in a category. The durable tier is the source of truth;
	// cache-only mode lists from the cache.
	listKeys(pCategory, fCallback)
	{
		if (!this.durable)
		{
			return this.cache.listKeys(pCategory, fCallback);
		}
		let tmpPrefix = `${pCategory}/`;
		this.durable.list(tmpPrefix,
			(pError, pKeys) =>
			{
				if (pError) { return fCallback(pError); }
				let tmpHashes = (pKeys || []).map((pKey) => (pKey.indexOf(tmpPrefix) === 0) ? pKey.substring(tmpPrefix.length) : pKey);
				return fCallback(null, tmpHashes);
			});
	}

	// A time-limited direct-download URL from the durable tier (for "serve direct,
	// never proxy"), when the backend supports presigning; otherwise (null, null)
	// and the caller proxies through the cache instead.
	presignGet(pCategory, pHash, pOptions, fCallback)
	{
		if (!this.durable || !this.durable.capabilities || !this.durable.capabilities().Presign)
		{
			return fCallback(null, null);
		}
		return this.durable.presignGet(this.durableKey(pCategory, pHash), pOptions || {}, fCallback);
	}

	capabilities()
	{
		return (
			{
				Durable: !!this.durable,
				Backend: this.durable ? this.durable.adapterType : 'none',
				WriteMode: this.writeMode,
				Presign: !!(this.durable && this.durable.capabilities && this.durable.capabilities().Presign),
				CachedBytes: this._cachedBytes,
				CachedObjects: this._index.size
			});
	}
}

module.exports = ParimeTieredBinaryStorage;
module.exports.default_cache_options = _DefaultCache;
