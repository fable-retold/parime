const libFableServiceBase = require('fable-serviceproviderbase');
const libFS = require('fs');
const libPath = require('path');

const _DefaultOptions = (
	{
	});

class ParimeBinaryStorage extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		this.serviceType = 'ParimeBinaryStorage';

		this.storageRoot = (typeof(this.fable.settings.ParimeBinaryStorageRoot) === 'string')
			? this.fable.settings.ParimeBinaryStorageRoot
			: './parime-binary-storage/';

		// Sharding configuration: distributes files into subdirectories
		// based on hash prefix segments to avoid huge flat directories.
		let tmpShardConfig = this.fable.settings.ParimeBinarySharding || {};
		this.shardingEnabled = !!(tmpShardConfig.Enabled);
		this.shardSegmentSize = (typeof(tmpShardConfig.SegmentSize) === 'number')
			? tmpShardConfig.SegmentSize : 2;
		this.shardDepth = (typeof(tmpShardConfig.Depth) === 'number')
			? tmpShardConfig.Depth : 4;
	}

	/**
	 * Initialize the binary storage service.
	 * Ensures the root storage directory exists.
	 *
	 * @param {function} fCallback - Callback(pError).
	 */
	initialize(fCallback)
	{
		try
		{
			let tmpResolvedRoot = libPath.resolve(this.storageRoot);
			this.storageRoot = tmpResolvedRoot;

			if (!libFS.existsSync(this.storageRoot))
			{
				libFS.mkdirSync(this.storageRoot, { recursive: true });
			}
			this.fable.log.info(`Parime Binary Storage initialized at [${this.storageRoot}].`);
			return fCallback();
		}
		catch (pError)
		{
			this.fable.log.error(`Error initializing Parime Binary Storage: ${pError.message}`, pError);
			return fCallback(pError);
		}
	}

	/**
	 * Compute the shard subdirectory path for a given hash.
	 *
	 * When sharding is enabled, this extracts prefix segments from the hash
	 * to produce a nested directory path.  For example, with SegmentSize=2
	 * and Depth=4, hash '234381asf9af' yields '23/43/81/as'.
	 *
	 * @param {string} pHash - The hash string to compute shard path for.
	 * @returns {string} The shard subdirectory path, or empty string if sharding is disabled.
	 */
	computeShardPath(pHash)
	{
		if (!this.shardingEnabled)
		{
			return '';
		}

		// Strip forward slashes — shard is computed from the hash prefix only,
		// not from any nested key structure.
		let tmpHashClean = pHash.replace(/\//g, '');
		let tmpSegments = [];

		for (let i = 0; i < this.shardDepth; i++)
		{
			let tmpStart = i * this.shardSegmentSize;
			let tmpEnd = tmpStart + this.shardSegmentSize;
			if (tmpEnd > tmpHashClean.length)
			{
				break;
			}
			tmpSegments.push(tmpHashClean.substring(tmpStart, tmpEnd));
		}

		return tmpSegments.join('/');
	}

	/**
	 * Resolve a category + hash to an absolute filesystem path.
	 * Forward slashes in pHash create nested subdirectories.
	 * When sharding is enabled, shard prefix directories are inserted
	 * between the category and the hash.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash (may contain forward slashes).
	 * @returns {string} The resolved absolute file path.
	 */
	resolvePath(pCategory, pHash)
	{
		let tmpShardPath = this.computeShardPath(pHash);
		if (tmpShardPath)
		{
			return libPath.join(this.storageRoot, pCategory, tmpShardPath, pHash);
		}
		return libPath.join(this.storageRoot, pCategory, pHash);
	}

	/**
	 * Write binary data to storage.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash.
	 * @param {Buffer} pBuffer - The binary data to write.
	 * @param {function} fCallback - Callback(pError).
	 */
	write(pCategory, pHash, pBuffer, fCallback)
	{
		let tmpFilePath = this.resolvePath(pCategory, pHash);
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
						this.fable.log.error(`Error writing binary file [${tmpFilePath}]: ${pError.message}`, pError);
						return fCallback(pError);
					}
					return fCallback();
				});
		}
		catch (pError)
		{
			this.fable.log.error(`Error creating directory for binary file [${tmpFilePath}]: ${pError.message}`, pError);
			return fCallback(pError);
		}
	}

	/**
	 * Read binary data from storage.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash.
	 * @param {function} fCallback - Callback(pError, pBuffer).
	 */
	read(pCategory, pHash, fCallback)
	{
		let tmpFilePath = this.resolvePath(pCategory, pHash);

		libFS.readFile(tmpFilePath,
			(pError, pData) =>
			{
				if (pError)
				{
					if (pError.code === 'ENOENT')
					{
						return fCallback(null, null);
					}
					this.fable.log.error(`Error reading binary file [${tmpFilePath}]: ${pError.message}`, pError);
					return fCallback(pError);
				}
				return fCallback(null, pData);
			});
	}

	/**
	 * Get a readable stream for binary data.
	 * Supports byte-range via pOptions.start and pOptions.end.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash.
	 * @param {object} pOptions - Stream options ({ start, end } for byte range).
	 * @returns {ReadStream} A readable file stream.
	 */
	readStream(pCategory, pHash, pOptions)
	{
		let tmpFilePath = this.resolvePath(pCategory, pHash);
		let tmpStreamOptions = {};

		if (pOptions && (typeof(pOptions.start) === 'number'))
		{
			tmpStreamOptions.start = pOptions.start;
		}
		if (pOptions && (typeof(pOptions.end) === 'number'))
		{
			tmpStreamOptions.end = pOptions.end;
		}

		return libFS.createReadStream(tmpFilePath, tmpStreamOptions);
	}

	/**
	 * Get file statistics.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash.
	 * @param {function} fCallback - Callback(pError, pStats).
	 */
	stat(pCategory, pHash, fCallback)
	{
		let tmpFilePath = this.resolvePath(pCategory, pHash);

		libFS.stat(tmpFilePath,
			(pError, pStats) =>
			{
				if (pError)
				{
					if (pError.code === 'ENOENT')
					{
						return fCallback(null, null);
					}
					this.fable.log.error(`Error getting stats for binary file [${tmpFilePath}]: ${pError.message}`, pError);
					return fCallback(pError);
				}
				return fCallback(null, pStats);
			});
	}

	/**
	 * Delete a binary file from storage.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash.
	 * @param {function} fCallback - Callback(pError).
	 */
	delete(pCategory, pHash, fCallback)
	{
		let tmpFilePath = this.resolvePath(pCategory, pHash);

		libFS.unlink(tmpFilePath,
			(pError) =>
			{
				if (pError)
				{
					if (pError.code === 'ENOENT')
					{
						// File doesn't exist, treat as success
						return fCallback();
					}
					this.fable.log.error(`Error deleting binary file [${tmpFilePath}]: ${pError.message}`, pError);
					return fCallback(pError);
				}
				return fCallback();
			});
	}

	/**
	 * Check if a binary file exists.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {string} pHash - The record hash.
	 * @param {function} fCallback - Callback(pError, pExists).
	 */
	exists(pCategory, pHash, fCallback)
	{
		let tmpFilePath = this.resolvePath(pCategory, pHash);

		libFS.access(tmpFilePath, libFS.constants.F_OK,
			(pError) =>
			{
				return fCallback(null, !pError);
			});
	}

	/**
	 * List all keys in a category, recursively walking nested directories.
	 * Reconstructs forward-slash-separated keys from the directory structure.
	 *
	 * When sharding is enabled, shard prefix directories (those matching the
	 * configured SegmentSize at the expected depth) are treated as structural
	 * and stripped from the returned keys.
	 *
	 * @param {string} pCategory - The lake category.
	 * @param {function} fCallback - Callback(pError, pKeys).
	 */
	listKeys(pCategory, fCallback)
	{
		let tmpCategoryPath = libPath.join(this.storageRoot, pCategory);

		if (!libFS.existsSync(tmpCategoryPath))
		{
			return fCallback(null, []);
		}

		let tmpKeys = [];
		let tmpSelf = this;

		let tmpWalkDirectory = (pDirPath, pPrefix, pShardDepthRemaining) =>
		{
			let tmpEntries;
			try
			{
				tmpEntries = libFS.readdirSync(pDirPath, { withFileTypes: true });
			}
			catch (pError)
			{
				tmpSelf.fable.log.error(`Error reading directory [${pDirPath}]: ${pError.message}`, pError);
				return;
			}

			for (let i = 0; i < tmpEntries.length; i++)
			{
				let tmpEntry = tmpEntries[i];

				if (tmpEntry.isDirectory())
				{
					if (pShardDepthRemaining > 0 && tmpEntry.name.length === tmpSelf.shardSegmentSize)
					{
						// This is a shard directory — descend without adding to key prefix
						tmpWalkDirectory(libPath.join(pDirPath, tmpEntry.name), pPrefix, pShardDepthRemaining - 1);
					}
					else
					{
						// Regular directory — part of the key path
						let tmpKey = pPrefix ? `${pPrefix}/${tmpEntry.name}` : tmpEntry.name;
						tmpWalkDirectory(libPath.join(pDirPath, tmpEntry.name), tmpKey, 0);
					}
				}
				else if (tmpEntry.isFile())
				{
					let tmpKey = pPrefix ? `${pPrefix}/${tmpEntry.name}` : tmpEntry.name;
					tmpKeys.push(tmpKey);
				}
			}
		};

		try
		{
			let tmpShardDepth = this.shardingEnabled ? this.shardDepth : 0;
			tmpWalkDirectory(tmpCategoryPath, '', tmpShardDepth);
			return fCallback(null, tmpKeys);
		}
		catch (pError)
		{
			tmpSelf.fable.log.error(`Error listing binary keys for category [${pCategory}]: ${pError.message}`, pError);
			return fCallback(pError);
		}
	}
}

module.exports = ParimeBinaryStorage;
module.exports.default_options = _DefaultOptions;
