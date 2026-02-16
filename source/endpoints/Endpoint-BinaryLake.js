const libOratorEndpoint = require('../orator-extensions/Orator-Endpoint.js');

const _DefaultOptions = (
	{
		"EndpointIdentifier": 'BinaryLake',
		"EndpointMethods":
		{
			"GET":
				[
					{
						"Path": "/1.0/Binary/:category",
						"Function": "listBinaryKeys"
					}
				],
			"DEL":
				[
					{
						"Path": "/1.0/Binary/:category/:hash",
						"Function": "deleteBinary"
					}
				]
		}
	});

class EndpointBinaryLake extends libOratorEndpoint
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
	}

	onInitialize(fCallback)
	{
		let tmpOrator = this.fable.Orator;

		// Wildcard routes for binary paths with slashes
		// GET with byte-range support
		tmpOrator.serviceServer.get('/1.0/Binary/:category/Stat/*', this.statBinary.bind(this));
		tmpOrator.serviceServer.get('/1.0/Binary/:category/:hash/Stat', this.statBinary.bind(this));
		tmpOrator.serviceServer.get('/1.0/Binary/:category/*', this.readBinary.bind(this));

		// PUT binary data (raw body — no body parser, we read the raw stream)
		tmpOrator.serviceServer.put('/1.0/Binary/:category/*', this.writeBinary.bind(this));

		// DEL with wildcard for nested paths
		tmpOrator.serviceServer.del('/1.0/Binary/:category/*', this.deleteBinary.bind(this));

		return fCallback();
	}

	/**
	 * Extract the hash from the request, supporting both :hash param and wildcard (*) for nested paths.
	 *
	 * @param {object} pRequest - The request object.
	 * @returns {string|null} The extracted hash.
	 */
	extractHash(pRequest)
	{
		// Check for wildcard match first (for paths with slashes)
		if (pRequest.params['*'])
		{
			return pRequest.params['*'];
		}
		// Fall back to :hash param
		if (pRequest.params.hash)
		{
			return pRequest.params.hash;
		}
		return null;
	}

	/**
	 * Parse the Range header from the request.
	 * Supports: bytes=START-END, bytes=START-, bytes=-SUFFIX
	 *
	 * @param {string} pRangeHeader - The Range header value.
	 * @param {number} pTotalSize - The total file size.
	 * @returns {object|null} { start, end } or null if no valid range.
	 */
	parseRangeHeader(pRangeHeader, pTotalSize)
	{
		if (!pRangeHeader || (typeof(pRangeHeader) !== 'string'))
		{
			return null;
		}

		let tmpMatch = pRangeHeader.match(/^bytes=(\d*)-(\d*)$/);
		if (!tmpMatch)
		{
			return null;
		}

		let tmpStart = tmpMatch[1];
		let tmpEnd = tmpMatch[2];

		if (tmpStart === '' && tmpEnd === '')
		{
			return null;
		}

		let tmpResult = {};

		if (tmpStart === '')
		{
			// Suffix range: bytes=-500 means last 500 bytes
			let tmpSuffix = parseInt(tmpEnd, 10);
			if (isNaN(tmpSuffix) || tmpSuffix <= 0)
			{
				return null;
			}
			tmpResult.start = Math.max(0, pTotalSize - tmpSuffix);
			tmpResult.end = pTotalSize - 1;
		}
		else if (tmpEnd === '')
		{
			// Open-ended range: bytes=500-
			tmpResult.start = parseInt(tmpStart, 10);
			tmpResult.end = pTotalSize - 1;
		}
		else
		{
			// Full range: bytes=500-999
			tmpResult.start = parseInt(tmpStart, 10);
			tmpResult.end = parseInt(tmpEnd, 10);
		}

		// Validate range
		if (isNaN(tmpResult.start) || isNaN(tmpResult.end))
		{
			return null;
		}
		if (tmpResult.start > tmpResult.end)
		{
			return null;
		}
		if (tmpResult.start >= pTotalSize)
		{
			return null;
		}

		// Clamp end to file size
		if (tmpResult.end >= pTotalSize)
		{
			tmpResult.end = pTotalSize - 1;
		}

		return tmpResult;
	}

	/**
	 * GET /1.0/Binary/:category/:hash (or /1.0/Binary/:category/*)
	 * Read binary file with byte-range support.
	 */
	readBinary(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = this.extractHash(pRequest);
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		let tmpSanitizedHash = tmpValidation.sanitizeBinaryPath(tmpHash);
		if (!tmpSanitizedHash)
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid binary path.', fNext);
		}

		// Check if this is actually a Stat request that fell through
		if (tmpSanitizedHash.endsWith('/Stat') || tmpSanitizedHash === 'Stat')
		{
			// Strip the /Stat suffix and redirect to statBinary
			let tmpActualHash = tmpSanitizedHash.replace(/\/Stat$/, '').replace(/^Stat$/, '');
			if (!tmpActualHash)
			{
				return tmpValidation.sendError(pResponse, 400, 'Invalid binary path.', fNext);
			}
			pRequest.params._overrideHash = tmpActualHash;
			return this.statBinary(pRequest, pResponse, fNext);
		}

		tmpBinaryStorage.stat(tmpCategory, tmpSanitizedHash,
			(pError, pStats) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error getting stats for binary [${tmpCategory}/${tmpSanitizedHash}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error reading binary file: ${pError.message}`, fNext);
				}

				if (!pStats)
				{
					return tmpValidation.sendError(pResponse, 404, `Binary file [${tmpSanitizedHash}] not found in category [${tmpCategory}].`, fNext);
				}

				let tmpTotalSize = pStats.size;
				let tmpRangeHeader = pRequest.headers['range'] || pRequest.headers['Range'];
				let tmpRange = this.parseRangeHeader(tmpRangeHeader, tmpTotalSize);

				pResponse.setHeader('Accept-Ranges', 'bytes');
				pResponse.setHeader('Content-Type', 'application/octet-stream');

				if (tmpRange)
				{
					// Validate range is satisfiable
					if (tmpRange.start >= tmpTotalSize)
					{
						pResponse.setHeader('Content-Range', `bytes */${tmpTotalSize}`);
						pResponse.writeHead(416);
						pResponse.end();
						return fNext();
					}

					let tmpContentLength = tmpRange.end - tmpRange.start + 1;

					pResponse.setHeader('Content-Range', `bytes ${tmpRange.start}-${tmpRange.end}/${tmpTotalSize}`);
					pResponse.setHeader('Content-Length', tmpContentLength);
					pResponse.writeHead(206);

					let tmpStream = tmpBinaryStorage.readStream(tmpCategory, tmpSanitizedHash, { start: tmpRange.start, end: tmpRange.end });
					tmpStream.on('error',
						(pStreamError) =>
						{
							this.fable.log.error(`Error streaming binary [${tmpCategory}/${tmpSanitizedHash}]: ${pStreamError.message}`, pStreamError);
						});
					tmpStream.pipe(pResponse);
					tmpStream.on('end', () => { return fNext(); });
				}
				else
				{
					// Full file response
					pResponse.setHeader('Content-Length', tmpTotalSize);
					pResponse.writeHead(200);

					let tmpStream = tmpBinaryStorage.readStream(tmpCategory, tmpSanitizedHash, {});
					tmpStream.on('error',
						(pStreamError) =>
						{
							this.fable.log.error(`Error streaming binary [${tmpCategory}/${tmpSanitizedHash}]: ${pStreamError.message}`, pStreamError);
						});
					tmpStream.pipe(pResponse);
					tmpStream.on('end', () => { return fNext(); });
				}
			});
	}

	/**
	 * PUT /1.0/Binary/:category/:hash (or /1.0/Binary/:category/*)
	 * Write binary data (raw body).
	 */
	writeBinary(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = this.extractHash(pRequest);
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		let tmpSanitizedHash = tmpValidation.sanitizeBinaryPath(tmpHash);
		if (!tmpSanitizedHash)
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid binary path.', fNext);
		}

		let tmpBuffer = Buffer.alloc(0);

		pRequest.on('data',
			(pChunk) =>
			{
				tmpBuffer = Buffer.concat([tmpBuffer, pChunk]);
			});

		pRequest.on('end',
			() =>
			{
				tmpBinaryStorage.write(tmpCategory, tmpSanitizedHash, tmpBuffer,
					(pError) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error writing binary [${tmpCategory}/${tmpSanitizedHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error writing binary file: ${pError.message}`, fNext);
						}

						this.fable.log.info(`Binary Lake: Wrote ${tmpBuffer.length} bytes to [${tmpCategory}/${tmpSanitizedHash}].`);
						pResponse.send(200, { Category: tmpCategory, Hash: tmpSanitizedHash, Size: tmpBuffer.length, Written: true });
						return fNext();
					});
			});

		pRequest.on('error',
			(pError) =>
			{
				this.fable.log.error(`Error receiving binary data: ${pError.message}`, pError);
				return tmpValidation.sendError(pResponse, 500, `Error receiving binary data: ${pError.message}`, fNext);
			});
	}

	/**
	 * DEL /1.0/Binary/:category/:hash (or /1.0/Binary/:category/*)
	 * Delete a binary file.
	 */
	deleteBinary(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = this.extractHash(pRequest);
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		let tmpSanitizedHash = tmpValidation.sanitizeBinaryPath(tmpHash);
		if (!tmpSanitizedHash)
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid binary path.', fNext);
		}

		tmpBinaryStorage.delete(tmpCategory, tmpSanitizedHash,
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error deleting binary [${tmpCategory}/${tmpSanitizedHash}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error deleting binary file: ${pError.message}`, fNext);
				}

				this.fable.log.info(`Binary Lake: Deleted [${tmpCategory}/${tmpSanitizedHash}].`);
				pResponse.send(200, { Category: tmpCategory, Hash: tmpSanitizedHash, Deleted: true });
				return fNext();
			});
	}

	/**
	 * GET /1.0/Binary/:category
	 * List all binary keys in a category.
	 */
	listBinaryKeys(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		tmpBinaryStorage.listKeys(tmpCategory,
			(pError, pKeys) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error listing binary keys for category [${tmpCategory}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error listing binary keys: ${pError.message}`, fNext);
				}

				pResponse.send(200, { Category: tmpCategory, Keys: pKeys || [] });
				return fNext();
			});
	}

	/**
	 * GET /1.0/Binary/:category/:hash/Stat (or /1.0/Binary/:category/Stat/*)
	 * Get file statistics.
	 */
	statBinary(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params._overrideHash || this.extractHash(pRequest);
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		// For stat routes with wildcard, strip the "Stat/" prefix if present
		if (tmpHash && tmpHash.startsWith('Stat/'))
		{
			tmpHash = tmpHash.substring(5);
		}

		let tmpSanitizedHash = tmpValidation.sanitizeBinaryPath(tmpHash);
		if (!tmpSanitizedHash)
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid binary path.', fNext);
		}

		tmpBinaryStorage.stat(tmpCategory, tmpSanitizedHash,
			(pError, pStats) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error getting stats for binary [${tmpCategory}/${tmpSanitizedHash}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error getting file stats: ${pError.message}`, fNext);
				}

				if (!pStats)
				{
					return tmpValidation.sendError(pResponse, 404, `Binary file [${tmpSanitizedHash}] not found in category [${tmpCategory}].`, fNext);
				}

				pResponse.send(200,
					{
						Category: tmpCategory,
						Hash: tmpSanitizedHash,
						Size: pStats.size,
						Modified: pStats.mtime,
						Created: pStats.birthtime
					});
				return fNext();
			});
	}
}

module.exports = EndpointBinaryLake;
module.exports.default_options = _DefaultOptions;
