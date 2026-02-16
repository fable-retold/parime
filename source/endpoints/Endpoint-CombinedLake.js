const libOratorEndpoint = require('../orator-extensions/Orator-Endpoint.js');

const _DefaultOptions = (
	{
		"EndpointIdentifier": 'CombinedLake',
		"EndpointMethods":
		{
			"GET":
				[
					{
						"Path": "/1.0/Combined/:category",
						"Function": "listCombinedKeys"
					},
					{
						"Path": "/1.0/Combined/:category/:hash/Exists",
						"Function": "combinedExists"
					},
					{
						"Path": "/1.0/Combined/:category/:hash/Record",
						"Function": "readCombinedRecord"
					},
					{
						"Path": "/1.0/Combined/:category/:hash/File",
						"Function": "readCombinedFile"
					}
				],
			"DEL":
				[
					{
						"Path": "/1.0/Combined/:category/:hash",
						"Function": "deleteCombined"
					}
				]
		}
	});

class EndpointCombinedLake extends libOratorEndpoint
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
	}

	onInitialize(fCallback)
	{
		let tmpOrator = this.fable.Orator;

		// Register PUT routes that need body parsing for records, and raw body for files
		tmpOrator.serviceServer.putWithBodyParser('/1.0/Combined/:category/:hash/Record', this.writeCombinedRecord.bind(this));
		tmpOrator.serviceServer.put('/1.0/Combined/:category/:hash/File', this.writeCombinedFile.bind(this));

		return fCallback();
	}

	/**
	 * Ensure a Bibliograph source exists for the given category.
	 */
	ensureSource(pCategory, fCallback)
	{
		let tmpBibliograph = this.fable.Bibliograph;

		tmpBibliograph.checkSourceExists(pCategory,
			(pError, pExists) =>
			{
				if (pError)
				{
					return fCallback(pError);
				}
				if (pExists)
				{
					return fCallback();
				}
				tmpBibliograph.createSource(pCategory, fCallback);
			});
	}

	/**
	 * GET /1.0/Combined/:category
	 * List all keys (union of record and binary keys).
	 */
	listCombinedKeys(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpValidation = this.fable.ParimeLakeValidation;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		let tmpRecordKeys = [];
		let tmpBinaryKeys = [];
		let tmpAnticipate = this.fable.newAnticipate();

		// Get record keys from Bibliograph
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				this.ensureSource(tmpCategory,
					(pError) =>
					{
						if (pError)
						{
							return fDone(pError);
						}
						this.fable.ParimeBibliographHelpers.readRecordKeys(tmpCategory,
							(pError, pKeys) =>
							{
								if (!pError && pKeys)
								{
									tmpRecordKeys = pKeys;
								}
								return fDone();
							});
					});
			});

		// Get binary keys
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				this.fable.ParimeBinaryStorage.listKeys(tmpCategory,
					(pError, pKeys) =>
					{
						if (!pError && pKeys)
						{
							tmpBinaryKeys = pKeys;
						}
						return fDone();
					});
			});

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error listing combined keys for category [${tmpCategory}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error listing combined keys: ${pError.message}`, fNext);
				}

				// Merge keys into a unique set
				let tmpKeySet = {};
				for (let i = 0; i < tmpRecordKeys.length; i++)
				{
					let tmpKey = tmpRecordKeys[i];
					if (!tmpKeySet[tmpKey])
					{
						tmpKeySet[tmpKey] = { Key: tmpKey, HasRecord: true, HasFile: false };
					}
					else
					{
						tmpKeySet[tmpKey].HasRecord = true;
					}
				}
				for (let i = 0; i < tmpBinaryKeys.length; i++)
				{
					let tmpKey = tmpBinaryKeys[i];
					if (!tmpKeySet[tmpKey])
					{
						tmpKeySet[tmpKey] = { Key: tmpKey, HasRecord: false, HasFile: true };
					}
					else
					{
						tmpKeySet[tmpKey].HasFile = true;
					}
				}

				let tmpKeys = Object.keys(tmpKeySet).map((pKey) => { return tmpKeySet[pKey]; });
				pResponse.send(200, { Category: tmpCategory, Keys: tmpKeys });
				return fNext();
			});
	}

	/**
	 * GET /1.0/Combined/:category/:hash/Record
	 * Read the record portion.
	 */
	readCombinedRecord(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params.hash;
		let tmpValidation = this.fable.ParimeLakeValidation;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}
		if (!tmpValidation.validateHash(tmpHash))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid hash.', fNext);
		}

		this.ensureSource(tmpCategory,
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error ensuring source [${tmpCategory}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error accessing category: ${pError.message}`, fNext);
				}

				this.fable.Bibliograph.read(tmpCategory, tmpHash,
					(pError, pRecord) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error reading combined record [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error reading record: ${pError.message}`, fNext);
						}

						if (!pRecord)
						{
							return tmpValidation.sendError(pResponse, 404, `Record [${tmpHash}] not found in category [${tmpCategory}].`, fNext);
						}

						pResponse.send(200, pRecord);
						return fNext();
					});
			});
	}

	/**
	 * PUT /1.0/Combined/:category/:hash/Record
	 * Write the record portion.
	 */
	writeCombinedRecord(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params.hash;
		let tmpValidation = this.fable.ParimeLakeValidation;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}
		if (!tmpValidation.validateHash(tmpHash))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid hash.', fNext);
		}

		let tmpRecord = pRequest.body;
		if (!tmpRecord || (typeof(tmpRecord) !== 'object'))
		{
			return tmpValidation.sendError(pResponse, 400, 'Request body must be a JSON object.', fNext);
		}

		this.ensureSource(tmpCategory,
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error ensuring source [${tmpCategory}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error accessing category: ${pError.message}`, fNext);
				}

				this.fable.Bibliograph.write(tmpCategory, tmpHash, tmpRecord,
					(pError) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error writing combined record [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error writing record: ${pError.message}`, fNext);
						}

						this.fable.log.info(`Combined Lake: Wrote record [${tmpCategory}/${tmpHash}].`);
						pResponse.send(200, { Category: tmpCategory, Hash: tmpHash, Type: 'Record', Written: true });
						return fNext();
					});
			});
	}

	/**
	 * GET /1.0/Combined/:category/:hash/File
	 * Read the binary file portion with byte-range support.
	 */
	readCombinedFile(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params.hash;
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}
		if (!tmpValidation.validateHash(tmpHash))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid hash.', fNext);
		}

		tmpBinaryStorage.stat(tmpCategory, tmpHash,
			(pError, pStats) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error getting stats for combined file [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error reading file: ${pError.message}`, fNext);
				}

				if (!pStats)
				{
					return tmpValidation.sendError(pResponse, 404, `File [${tmpHash}] not found in category [${tmpCategory}].`, fNext);
				}

				let tmpTotalSize = pStats.size;
				let tmpRangeHeader = pRequest.headers['range'] || pRequest.headers['Range'];
				let tmpRange = this.parseRangeHeader(tmpRangeHeader, tmpTotalSize);

				pResponse.setHeader('Accept-Ranges', 'bytes');
				pResponse.setHeader('Content-Type', 'application/octet-stream');

				if (tmpRange)
				{
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

					let tmpStream = tmpBinaryStorage.readStream(tmpCategory, tmpHash, { start: tmpRange.start, end: tmpRange.end });
					tmpStream.on('error',
						(pStreamError) =>
						{
							this.fable.log.error(`Error streaming combined file [${tmpCategory}/${tmpHash}]: ${pStreamError.message}`, pStreamError);
						});
					tmpStream.pipe(pResponse);
					tmpStream.on('end', () => { return fNext(); });
				}
				else
				{
					pResponse.setHeader('Content-Length', tmpTotalSize);
					pResponse.writeHead(200);

					let tmpStream = tmpBinaryStorage.readStream(tmpCategory, tmpHash, {});
					tmpStream.on('error',
						(pStreamError) =>
						{
							this.fable.log.error(`Error streaming combined file [${tmpCategory}/${tmpHash}]: ${pStreamError.message}`, pStreamError);
						});
					tmpStream.pipe(pResponse);
					tmpStream.on('end', () => { return fNext(); });
				}
			});
	}

	/**
	 * PUT /1.0/Combined/:category/:hash/File
	 * Write the binary file portion.
	 */
	writeCombinedFile(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params.hash;
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpBinaryStorage = this.fable.ParimeBinaryStorage;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}
		if (!tmpValidation.validateHash(tmpHash))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid hash.', fNext);
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
				tmpBinaryStorage.write(tmpCategory, tmpHash, tmpBuffer,
					(pError) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error writing combined file [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error writing file: ${pError.message}`, fNext);
						}

						this.fable.log.info(`Combined Lake: Wrote ${tmpBuffer.length} bytes to file [${tmpCategory}/${tmpHash}].`);
						pResponse.send(200, { Category: tmpCategory, Hash: tmpHash, Type: 'File', Size: tmpBuffer.length, Written: true });
						return fNext();
					});
			});

		pRequest.on('error',
			(pError) =>
			{
				this.fable.log.error(`Error receiving combined file data: ${pError.message}`, pError);
				return tmpValidation.sendError(pResponse, 500, `Error receiving file data: ${pError.message}`, fNext);
			});
	}

	/**
	 * DEL /1.0/Combined/:category/:hash
	 * Delete both the record and binary file.
	 */
	deleteCombined(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params.hash;
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpAnticipate = this.fable.newAnticipate();

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}
		if (!tmpValidation.validateHash(tmpHash))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid hash.', fNext);
		}

		let tmpRecordDeleted = false;
		let tmpFileDeleted = false;

		// Delete the record
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				this.ensureSource(tmpCategory,
					(pError) =>
					{
						if (pError)
						{
							return fDone(pError);
						}
						this.fable.Bibliograph.delete(tmpCategory, tmpHash,
							(pError) =>
							{
								if (!pError)
								{
									tmpRecordDeleted = true;
								}
								return fDone();
							});
					});
			});

		// Delete the binary file
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				this.fable.ParimeBinaryStorage.delete(tmpCategory, tmpHash,
					(pError) =>
					{
						if (!pError)
						{
							tmpFileDeleted = true;
						}
						return fDone();
					});
			});

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error deleting combined [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error deleting combined entry: ${pError.message}`, fNext);
				}

				this.fable.log.info(`Combined Lake: Deleted [${tmpCategory}/${tmpHash}] (record=${tmpRecordDeleted}, file=${tmpFileDeleted}).`);
				pResponse.send(200, { Category: tmpCategory, Hash: tmpHash, RecordDeleted: tmpRecordDeleted, FileDeleted: tmpFileDeleted });
				return fNext();
			});
	}

	/**
	 * GET /1.0/Combined/:category/:hash/Exists
	 * Check existence of both record and file.
	 */
	combinedExists(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpHash = pRequest.params.hash;
		let tmpValidation = this.fable.ParimeLakeValidation;
		let tmpAnticipate = this.fable.newAnticipate();

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}
		if (!tmpValidation.validateHash(tmpHash))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid hash.', fNext);
		}

		let tmpRecordExists = false;
		let tmpFileExists = false;

		// Check record existence
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				this.ensureSource(tmpCategory,
					(pError) =>
					{
						if (pError)
						{
							return fDone(pError);
						}
						this.fable.ParimeBibliographHelpers.exists(tmpCategory, tmpHash,
							(pError, pExists) =>
							{
								if (!pError)
								{
									tmpRecordExists = !!pExists;
								}
								return fDone();
							});
					});
			});

		// Check file existence
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				this.fable.ParimeBinaryStorage.exists(tmpCategory, tmpHash,
					(pError, pExists) =>
					{
						if (!pError)
						{
							tmpFileExists = !!pExists;
						}
						return fDone();
					});
			});

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error checking combined existence [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error checking combined existence: ${pError.message}`, fNext);
				}

				pResponse.send(200,
					{
						Category: tmpCategory,
						Hash: tmpHash,
						RecordExists: tmpRecordExists,
						FileExists: tmpFileExists
					});
				return fNext();
			});
	}

	/**
	 * Parse the Range header (shared with BinaryLake).
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
			tmpResult.start = parseInt(tmpStart, 10);
			tmpResult.end = pTotalSize - 1;
		}
		else
		{
			tmpResult.start = parseInt(tmpStart, 10);
			tmpResult.end = parseInt(tmpEnd, 10);
		}

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
		if (tmpResult.end >= pTotalSize)
		{
			tmpResult.end = pTotalSize - 1;
		}

		return tmpResult;
	}
}

module.exports = EndpointCombinedLake;
module.exports.default_options = _DefaultOptions;
