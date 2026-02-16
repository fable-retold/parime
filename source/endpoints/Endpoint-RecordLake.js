const libOratorEndpoint = require('../orator-extensions/Orator-Endpoint.js');

const _DefaultOptions = (
	{
		"EndpointIdentifier": 'RecordLake',
		"EndpointMethods":
		{
			"GET":
				[
					{
						"Path": "/1.0/Record/:category",
						"Function": "listRecords"
					},
					{
						"Path": "/1.0/Record/:category/Exists/:hash",
						"Function": "recordExists"
					},
					{
						"Path": "/1.0/Record/:category/:hash/Metadata",
						"Function": "readRecordMetadata"
					},
					{
						"Path": "/1.0/Record/:category/:hash/Delta",
						"Function": "readRecordDelta"
					},
					{
						"Path": "/1.0/Record/:category/:hash",
						"Function": "readRecord"
					}
				],
			"DEL":
				[
					{
						"Path": "/1.0/Record/:category/:hash",
						"Function": "deleteRecord"
					}
				]
		}
	});

class EndpointRecordLake extends libOratorEndpoint
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
	}

	onInitialize(fCallback)
	{
		// Register PUT routes that need body parsing (cannot be done via EndpointMethods auto-mapping)
		let tmpOrator = this.fable.Orator;
		tmpOrator.serviceServer.putWithBodyParser('/1.0/Record/:category/:hash', this.writeRecord.bind(this));
		return fCallback();
	}

	/**
	 * Ensure a Bibliograph source exists for the given category, creating it if necessary.
	 *
	 * @param {string} pCategory - The category/source hash.
	 * @param {function} fCallback - Callback(pError).
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
	 * GET /1.0/Record/:category
	 * List all record keys in a category.
	 */
	listRecords(pRequest, pResponse, fNext)
	{
		let tmpCategory = pRequest.params.category;
		let tmpValidation = this.fable.ParimeLakeValidation;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return tmpValidation.sendError(pResponse, 400, 'Invalid category name.', fNext);
		}

		this.ensureSource(tmpCategory,
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error(`Error ensuring source [${tmpCategory}]: ${pError.message}`, pError);
					return tmpValidation.sendError(pResponse, 500, `Error accessing category: ${pError.message}`, fNext);
				}

				this.fable.ParimeBibliographHelpers.readRecordKeys(tmpCategory,
					(pError, pKeys) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error listing records for category [${tmpCategory}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error listing records: ${pError.message}`, fNext);
						}

						pResponse.send(200, { Category: tmpCategory, Keys: pKeys || [] });
						return fNext();
					});
			});
	}

	/**
	 * GET /1.0/Record/:category/:hash
	 * Read a single record.
	 */
	readRecord(pRequest, pResponse, fNext)
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
							this.fable.log.error(`Error reading record [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
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
	 * GET /1.0/Record/:category/:hash/Metadata
	 * Read record metadata.
	 */
	readRecordMetadata(pRequest, pResponse, fNext)
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

				this.fable.Bibliograph.readRecordMetadata(tmpCategory, tmpHash,
					(pError, pMetadata) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error reading metadata [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error reading record metadata: ${pError.message}`, fNext);
						}

						if (!pMetadata)
						{
							return tmpValidation.sendError(pResponse, 404, `Metadata for record [${tmpHash}] not found in category [${tmpCategory}].`, fNext);
						}

						pResponse.send(200, pMetadata);
						return fNext();
					});
			});
	}

	/**
	 * GET /1.0/Record/:category/:hash/Delta
	 * Read record delta history.
	 */
	readRecordDelta(pRequest, pResponse, fNext)
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

				this.fable.ParimeBibliographHelpers.readRecordDelta(tmpCategory, tmpHash,
					(pError, pDelta) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error reading delta [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error reading record delta: ${pError.message}`, fNext);
						}

						if (!pDelta)
						{
							return tmpValidation.sendError(pResponse, 404, `Delta for record [${tmpHash}] not found in category [${tmpCategory}].`, fNext);
						}

						pResponse.send(200, pDelta);
						return fNext();
					});
			});
	}

	/**
	 * PUT /1.0/Record/:category/:hash
	 * Create or update a record.
	 */
	writeRecord(pRequest, pResponse, fNext)
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
							this.fable.log.error(`Error writing record [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error writing record: ${pError.message}`, fNext);
						}

						this.fable.log.info(`Record Lake: Wrote record [${tmpCategory}/${tmpHash}].`);
						pResponse.send(200, { Category: tmpCategory, Hash: tmpHash, Written: true });
						return fNext();
					});
			});
	}

	/**
	 * DEL /1.0/Record/:category/:hash
	 * Delete a record.
	 */
	deleteRecord(pRequest, pResponse, fNext)
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

				this.fable.Bibliograph.delete(tmpCategory, tmpHash,
					(pError) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error deleting record [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error deleting record: ${pError.message}`, fNext);
						}

						this.fable.log.info(`Record Lake: Deleted record [${tmpCategory}/${tmpHash}].`);
						pResponse.send(200, { Category: tmpCategory, Hash: tmpHash, Deleted: true });
						return fNext();
					});
			});
	}

	/**
	 * GET /1.0/Record/:category/Exists/:hash
	 * Check if a record exists.
	 */
	recordExists(pRequest, pResponse, fNext)
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

				this.fable.ParimeBibliographHelpers.exists(tmpCategory, tmpHash,
					(pError, pExists) =>
					{
						if (pError)
						{
							this.fable.log.error(`Error checking existence [${tmpCategory}/${tmpHash}]: ${pError.message}`, pError);
							return tmpValidation.sendError(pResponse, 500, `Error checking record existence: ${pError.message}`, fNext);
						}

						pResponse.send(200, { Category: tmpCategory, Hash: tmpHash, Exists: !!pExists });
						return fNext();
					});
			});
	}
}

module.exports = EndpointRecordLake;
module.exports.default_options = _DefaultOptions;
