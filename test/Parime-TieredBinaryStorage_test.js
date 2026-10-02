/**
 * Parime Tiered Binary Storage -- a local filesystem cache in front of a durable
 * external backend.
 *
 * These tests exercise the whole tiered mechanism against the filesystem durable
 * adapter (no network, no credentials): write-through lands in both tiers,
 * read-through pulls from the backend on a cold cache (buffer and stream),
 * eviction bounds the cache while the durable copy survives, write-back pushes
 * asynchronously, and the no-backend default behaves like plain local storage.
 */
const libAssert = require('assert');
const libFS = require('fs');
const libPath = require('path');

const libFable = require('fable');

const libTieredBinaryStorage = require('../source/services/Parime-TieredBinaryStorage.js');
const libAdapterFilesystem = require('../source/services/adapters/Parime-Adapter-Filesystem.js');

const TMP = libPath.join(__dirname, 'tmp-tiered');

function cleanDir(pPath)
{
	if (libFS.existsSync(pPath)) { libFS.rmSync(pPath, { recursive: true, force: true }); }
}

function collectStream(pStream, fCallback)
{
	let tmpChunks = [];
	pStream.on('data', (pChunk) => tmpChunks.push(pChunk));
	pStream.on('end', () => fCallback(null, Buffer.concat(tmpChunks)));
	pStream.on('error', (pError) => fCallback(pError));
}

function makeFable(pCacheRoot, pDurableRoot, pBackendExtra)
{
	let tmpBackend = Object.assign(
		{
			Type: 'filesystem',
			WriteMode: 'write-through',
			Filesystem: { Root: pDurableRoot }
		}, pBackendExtra || {});
	return new libFable(
		{
			Product: 'ParimeTieredTest',
			ProductVersion: '1.0.0',
			ParimeBinaryStorageRoot: pCacheRoot,
			ParimeDurableBackend: tmpBackend
		});
}

suite
(
	'Parime Tiered Binary Storage',
	function ()
	{
		suiteTeardown(function () { cleanDir(TMP); });

		suite
		(
			'write-through + read-through (filesystem backend)',
			function ()
			{
				let _Cache = libPath.join(TMP, 'wt-cache');
				let _Durable = libPath.join(TMP, 'wt-durable');
				let _Tiered = null;

				suiteSetup
				(
					function (fDone)
					{
						cleanDir(_Cache); cleanDir(_Durable);
						let tmpFable = makeFable(_Cache, _Durable);
						tmpFable.addServiceType('ParimeTieredBinaryStorage', libTieredBinaryStorage);
						_Tiered = tmpFable.instantiateServiceProvider('ParimeTieredBinaryStorage');
						_Tiered.initialize(fDone);
					}
				);

				test('reports a durable backend is wired', function ()
				{
					let tmpCaps = _Tiered.capabilities();
					libAssert.strictEqual(tmpCaps.Durable, true);
					libAssert.strictEqual(tmpCaps.Backend, 'filesystem');
					libAssert.strictEqual(tmpCaps.WriteMode, 'write-through');
					libAssert.strictEqual(tmpCaps.Presign, false);
				});

				test('write-through stores the blob in BOTH the cache and the durable backend', function (fDone)
				{
					let tmpBytes = Buffer.from('hello tiered world');
					_Tiered.write('media-blobs', 'blob-a', tmpBytes,
						(pError) =>
						{
							libAssert.ok(!pError, 'write failed: ' + (pError && pError.message));
							// Durable copy on disk at <durable>/media-blobs/blob-a
							libAssert.ok(libFS.existsSync(libPath.join(_Durable, 'media-blobs', 'blob-a')), 'durable copy missing');
							// Cache copy present per the cache tier
							_Tiered.cache.exists('media-blobs', 'blob-a',
								(pExistsError, pExists) =>
								{
									libAssert.ok(!pExistsError);
									libAssert.strictEqual(pExists, true, 'cache copy missing');
									fDone();
								});
						});
				});

				test('read serves the bytes back', function (fDone)
				{
					_Tiered.read('media-blobs', 'blob-a',
						(pError, pBuffer) =>
						{
							libAssert.ok(!pError);
							libAssert.strictEqual(pBuffer.toString(), 'hello tiered world');
							fDone();
						});
				});

				test('read-through: a blob only in the durable tier is fetched and cached on read', function (fDone)
				{
					// Seed the durable backend directly, bypassing the cache.
					let tmpBytes = Buffer.from('durable only payload');
					_Tiered.durable.put('media-blobs/cold-1', tmpBytes, { Size: tmpBytes.length },
						(pPutError) =>
						{
							libAssert.ok(!pPutError);
							// Not in the cache yet.
							_Tiered.cache.exists('media-blobs', 'cold-1',
								(pE1, pExistsBefore) =>
								{
									libAssert.strictEqual(pExistsBefore, false, 'should be a cold cache');
									_Tiered.read('media-blobs', 'cold-1',
										(pReadError, pBuffer) =>
										{
											libAssert.ok(!pReadError);
											libAssert.strictEqual(pBuffer.toString(), 'durable only payload');
											// Now populated in the cache.
											_Tiered.cache.exists('media-blobs', 'cold-1',
												(pE2, pExistsAfter) =>
												{
													libAssert.strictEqual(pExistsAfter, true, 'read-through should populate the cache');
													fDone();
												});
										});
								});
						});
				});

				test('read-through over a stream (large-media path) fetches, caches, and serves', function (fDone)
				{
					let tmpBytes = Buffer.from('streamed cold payload '.repeat(16));
					_Tiered.durable.put('media-blobs/cold-stream', tmpBytes, { Size: tmpBytes.length },
						(pPutError) =>
						{
							libAssert.ok(!pPutError);
							let tmpStream = _Tiered.readStream('media-blobs', 'cold-stream');
							collectStream(tmpStream,
								(pStreamError, pBuffer) =>
								{
									libAssert.ok(!pStreamError, 'stream failed: ' + (pStreamError && pStreamError.message));
									libAssert.strictEqual(pBuffer.toString(), tmpBytes.toString());
									_Tiered.cache.exists('media-blobs', 'cold-stream',
										(pE, pExists) =>
										{
											libAssert.strictEqual(pExists, true, 'stream read-through should populate the cache');
											fDone();
										});
								});
						});
				});

				test('stat reports the size for a cached blob', function (fDone)
				{
					_Tiered.stat('media-blobs', 'blob-a',
						(pError, pStat) =>
						{
							libAssert.ok(!pError);
							libAssert.ok(pStat, 'no stat');
							libAssert.strictEqual(pStat.size, Buffer.from('hello tiered world').length);
							fDone();
						});
				});

				test('exists is true for a durable-only blob even when not cached', function (fDone)
				{
					let tmpBytes = Buffer.from('exists check');
					_Tiered.durable.put('media-blobs/exists-only', tmpBytes, {},
						(pPutError) =>
						{
							libAssert.ok(!pPutError);
							_Tiered.exists('media-blobs', 'exists-only',
								(pError, pExists) =>
								{
									libAssert.ok(!pError);
									libAssert.strictEqual(pExists, true);
									fDone();
								});
						});
				});

				test('delete removes the blob from BOTH tiers', function (fDone)
				{
					_Tiered.delete('media-blobs', 'blob-a',
						(pError) =>
						{
							libAssert.ok(!pError);
							libAssert.strictEqual(libFS.existsSync(libPath.join(_Durable, 'media-blobs', 'blob-a')), false, 'durable copy not deleted');
							_Tiered.cache.exists('media-blobs', 'blob-a',
								(pE, pExists) =>
								{
									libAssert.strictEqual(pExists, false, 'cache copy not deleted');
									fDone();
								});
						});
				});

				test('listKeys reflects the durable tier (source of truth)', function (fDone)
				{
					_Tiered.listKeys('media-blobs',
						(pError, pKeys) =>
						{
							libAssert.ok(!pError);
							libAssert.ok(pKeys.indexOf('cold-1') >= 0, 'cold-1 should be listed');
							libAssert.ok(pKeys.indexOf('blob-a') < 0, 'blob-a was deleted and should not be listed');
							fDone();
						});
				});

				test('presignGet is null on a filesystem backend (no direct-serve)', function (fDone)
				{
					_Tiered.presignGet('media-blobs', 'cold-1', {},
						(pError, pURL) =>
						{
							libAssert.ok(!pError);
							libAssert.strictEqual(pURL, null);
							fDone();
						});
				});
			}
		);

		suite
		(
			'eviction bounds the cache while the durable copy survives',
			function ()
			{
				let _Cache = libPath.join(TMP, 'ev-cache');
				let _Durable = libPath.join(TMP, 'ev-durable');
				let _Tiered = null;

				suiteSetup
				(
					function (fDone)
					{
						cleanDir(_Cache); cleanDir(_Durable);
						// Budget of 300 bytes, evict down to 50% (150 bytes) above 90%.
						let tmpFable = makeFable(_Cache, _Durable, { Cache: { MaxBytes: 300, HighWater: 0.9, LowWater: 0.5, Score: 'lru' } });
						tmpFable.addServiceType('ParimeTieredBinaryStorage', libTieredBinaryStorage);
						_Tiered = tmpFable.instantiateServiceProvider('ParimeTieredBinaryStorage');
						_Tiered.initialize(fDone);
					}
				);

				test('writing past the budget evicts cold cache files but never the durable copies', function (fDone)
				{
					let tmpBlob = () => Buffer.alloc(100, 'x');
					let fWrite = (pIndex, fNext) =>
					{
						_Tiered.write('media-blobs', 'ev-' + pIndex, tmpBlob(), (pError) => { libAssert.ok(!pError); fNext(); });
					};
					// Five 100-byte blobs = 500 bytes, well past the 270-byte high-water mark.
					fWrite(0, () => fWrite(1, () => fWrite(2, () => fWrite(3, () => fWrite(4,
						() =>
						{
							// Eviction runs asynchronously; give it a moment to settle.
							setTimeout(
								() =>
								{
									let tmpCaps = _Tiered.capabilities();
									libAssert.ok(tmpCaps.CachedBytes <= 150, 'cache not evicted to low-water: ' + tmpCaps.CachedBytes + ' bytes');
									// All five durable copies survive eviction.
									for (let i = 0; i < 5; i++)
									{
										libAssert.ok(libFS.existsSync(libPath.join(_Durable, 'media-blobs', 'ev-' + i)), 'durable ev-' + i + ' missing');
									}
									fDone();
								}, 150);
						})))));
				});

				test('an evicted blob is transparently re-fetched from the durable tier on read', function (fDone)
				{
					// ev-0 is the oldest and should have been evicted from cache.
					_Tiered.cache.exists('media-blobs', 'ev-0',
						(pE, pCachedBefore) =>
						{
							libAssert.strictEqual(pCachedBefore, false, 'oldest blob should have been evicted from cache');
							_Tiered.read('media-blobs', 'ev-0',
								(pError, pBuffer) =>
								{
									libAssert.ok(!pError);
									libAssert.strictEqual(pBuffer.length, 100, 're-fetched blob wrong size');
									fDone();
								});
						});
				});
			}
		);

		suite
		(
			'write-back pushes to the durable tier asynchronously',
			function ()
			{
				let _Cache = libPath.join(TMP, 'wb-cache');
				let _Durable = libPath.join(TMP, 'wb-durable');
				let _Tiered = null;

				suiteSetup
				(
					function (fDone)
					{
						cleanDir(_Cache); cleanDir(_Durable);
						let tmpFable = makeFable(_Cache, _Durable, { WriteMode: 'write-back' });
						tmpFable.addServiceType('ParimeTieredBinaryStorage', libTieredBinaryStorage);
						_Tiered = tmpFable.instantiateServiceProvider('ParimeTieredBinaryStorage');
						_Tiered.initialize(fDone);
					}
				);

				test('write-back caches immediately and reaches the durable tier shortly after', function (fDone)
				{
					let tmpBytes = Buffer.from('write back payload');
					_Tiered.write('media-blobs', 'wb-1', tmpBytes,
						(pError) =>
						{
							libAssert.ok(!pError);
							// Cached synchronously with the acknowledgement.
							_Tiered.cache.exists('media-blobs', 'wb-1',
								(pE, pExists) =>
								{
									libAssert.strictEqual(pExists, true, 'write-back should cache immediately');
									// Durable push happens on the next tick.
									setTimeout(
										() =>
										{
											libAssert.ok(libFS.existsSync(libPath.join(_Durable, 'media-blobs', 'wb-1')), 'write-back never reached the durable tier');
											fDone();
										}, 100);
								});
						});
				});
			}
		);

		suite
		(
			'no backend configured behaves like plain local storage',
			function ()
			{
				let _Cache = libPath.join(TMP, 'local-cache');
				let _Tiered = null;

				suiteSetup
				(
					function (fDone)
					{
						cleanDir(_Cache);
						let tmpFable = new libFable(
							{
								Product: 'ParimeTieredLocalTest',
								ProductVersion: '1.0.0',
								ParimeBinaryStorageRoot: _Cache,
								ParimeDurableBackend: { Type: 'none' }
							});
						tmpFable.addServiceType('ParimeTieredBinaryStorage', libTieredBinaryStorage);
						_Tiered = tmpFable.instantiateServiceProvider('ParimeTieredBinaryStorage');
						_Tiered.initialize(fDone);
					}
				);

				test('reports cache-only (no durable backend)', function ()
				{
					let tmpCaps = _Tiered.capabilities();
					libAssert.strictEqual(tmpCaps.Durable, false);
					libAssert.strictEqual(tmpCaps.Backend, 'none');
				});

				test('write then read round-trips entirely in the local cache', function (fDone)
				{
					let tmpBytes = Buffer.from('local only');
					_Tiered.write('media-blobs', 'local-1', tmpBytes,
						(pWriteError) =>
						{
							libAssert.ok(!pWriteError);
							_Tiered.read('media-blobs', 'local-1',
								(pReadError, pBuffer) =>
								{
									libAssert.ok(!pReadError);
									libAssert.strictEqual(pBuffer.toString(), 'local only');
									fDone();
								});
						});
				});

				test('reading a missing blob yields null (not an error)', function (fDone)
				{
					_Tiered.read('media-blobs', 'nope',
						(pError, pBuffer) =>
						{
							libAssert.ok(!pError);
							libAssert.strictEqual(pBuffer, null);
							fDone();
						});
				});
			}
		);
	}
);
