const libExternalStorageAdapter = require('../Parime-ExternalStorageAdapter.js');
const libFS = require('fs');
const libPath = require('path');

/**
 * Filesystem durable backend for Parime-TieredBinaryStorage.
 *
 * Stores each key as a file under a configured root directory. Because a mounted
 * NFS or SMB share is just a filesystem path, this adapter IS the NFS / SMB
 * backend (point Root at the mount). It is also the simplest real durable tier
 * for a second box or an attached volume, and the backend the tiered-storage
 * tests run against with no network and no credentials.
 *
 * Configuration (pOptions): { Root: string }. The key is written verbatim as a
 * relative path under Root, so a key of "media-blobs/ab/cd/<hash>" nests cleanly.
 *
 * @author Steven Velozo <steven@velozo.com>
 * @license MIT
 */
class ParimeAdapterFilesystem extends libExternalStorageAdapter
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.adapterType = 'filesystem';

		let tmpOptions = this.options || {};
		this.durableRoot = (typeof(tmpOptions.Root) === 'string' && tmpOptions.Root)
			? tmpOptions.Root
			: './parime-durable-storage/';
	}

	initialize(fCallback)
	{
		try
		{
			this.durableRoot = libPath.resolve(this.durableRoot);
			if (!libFS.existsSync(this.durableRoot))
			{
				libFS.mkdirSync(this.durableRoot, { recursive: true });
			}
			this.fable.log.info(`Parime filesystem durable backend initialized at [${this.durableRoot}].`);
			return fCallback();
		}
		catch (pError)
		{
			this.fable.log.error(`Error initializing Parime filesystem durable backend: ${pError.message}`, pError);
			return fCallback(pError);
		}
	}

	// Resolve a key to an absolute path under the durable root. Keys use forward
	// slashes, which libPath.join turns into nested directories on any platform.
	resolveKeyPath(pKey)
	{
		return libPath.join(this.durableRoot, pKey);
	}

	put(pKey, pBuffer, pOptions, fCallback)
	{
		let tmpFilePath = this.resolveKeyPath(pKey);
		let tmpDir = libPath.dirname(tmpFilePath);
		try
		{
			if (!libFS.existsSync(tmpDir))
			{
				libFS.mkdirSync(tmpDir, { recursive: true });
			}
			libFS.writeFile(tmpFilePath, pBuffer,
				(pError) =>
				{
					if (pError)
					{
						this.fable.log.error(`Error writing durable file [${tmpFilePath}]: ${pError.message}`, pError);
						return fCallback(pError);
					}
					return fCallback();
				});
		}
		catch (pError)
		{
			this.fable.log.error(`Error preparing durable file [${tmpFilePath}]: ${pError.message}`, pError);
			return fCallback(pError);
		}
	}

	get(pKey, fCallback)
	{
		let tmpFilePath = this.resolveKeyPath(pKey);
		libFS.readFile(tmpFilePath,
			(pError, pData) =>
			{
				if (pError)
				{
					if (pError.code === 'ENOENT')
					{
						return fCallback(null, null);
					}
					return fCallback(pError);
				}
				return fCallback(null, pData);
			});
	}

	getStream(pKey, pOptions, fCallback)
	{
		let tmpFilePath = this.resolveKeyPath(pKey);
		// Confirm the file exists before handing back a stream, so a missing key is
		// (null, null) rather than a stream that errors on first read.
		libFS.access(tmpFilePath, libFS.constants.F_OK,
			(pAccessError) =>
			{
				if (pAccessError)
				{
					return fCallback(null, null);
				}
				let tmpStreamOptions = {};
				if (pOptions && (typeof(pOptions.start) === 'number')) { tmpStreamOptions.start = pOptions.start; }
				if (pOptions && (typeof(pOptions.end) === 'number')) { tmpStreamOptions.end = pOptions.end; }
				return fCallback(null, libFS.createReadStream(tmpFilePath, tmpStreamOptions));
			});
	}

	head(pKey, fCallback)
	{
		let tmpFilePath = this.resolveKeyPath(pKey);
		libFS.stat(tmpFilePath,
			(pError, pStats) =>
			{
				if (pError)
				{
					if (pError.code === 'ENOENT')
					{
						return fCallback(null, { Exists: false, Size: 0, ETag: '' });
					}
					return fCallback(pError);
				}
				return fCallback(null, { Exists: true, Size: pStats.size, ETag: String(pStats.mtimeMs) });
			});
	}

	delete(pKey, fCallback)
	{
		let tmpFilePath = this.resolveKeyPath(pKey);
		libFS.unlink(tmpFilePath,
			(pError) =>
			{
				if (pError && (pError.code !== 'ENOENT'))
				{
					return fCallback(pError);
				}
				return fCallback();
			});
	}

	list(pPrefix, fCallback)
	{
		let tmpPrefix = pPrefix || '';
		let tmpBasePath = libPath.join(this.durableRoot, tmpPrefix);
		let tmpKeys = [];
		let tmpSelf = this;

		let fWalk = (pDirPath) =>
		{
			let tmpEntries;
			try
			{
				tmpEntries = libFS.readdirSync(pDirPath, { withFileTypes: true });
			}
			catch (pError)
			{
				if (pError.code === 'ENOENT') { return; }
				throw pError;
			}
			for (let i = 0; i < tmpEntries.length; i++)
			{
				let tmpEntry = tmpEntries[i];
				let tmpFull = libPath.join(pDirPath, tmpEntry.name);
				if (tmpEntry.isDirectory())
				{
					fWalk(tmpFull);
				}
				else if (tmpEntry.isFile())
				{
					// Key is the path relative to the durable root, forward-slash normalized.
					tmpKeys.push(libPath.relative(tmpSelf.durableRoot, tmpFull).split(libPath.sep).join('/'));
				}
			}
		};

		try
		{
			fWalk(tmpBasePath);
			return fCallback(null, tmpKeys);
		}
		catch (pError)
		{
			this.fable.log.error(`Error listing durable keys under [${tmpBasePath}]: ${pError.message}`, pError);
			return fCallback(pError);
		}
	}

	capabilities()
	{
		// A filesystem (or NFS / SMB mount) streams but cannot mint a presigned URL,
		// so the tiered store proxies reads through the cache on this backend.
		return ({ Presign: false, Stream: true });
	}
}

module.exports = ParimeAdapterFilesystem;
