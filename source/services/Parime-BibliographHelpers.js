const libFableServiceBase = require('fable-serviceproviderbase');
const libFS = require('fs');
const libPath = require('path');

const _DefaultOptions = (
	{
	});

/**
 * Helper methods for Bibliograph functionality not available in the published npm version.
 * These methods bridge the gap between the published Bibliograph API and the local development version.
 */
class ParimeBibliographHelpers extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		this.serviceType = 'ParimeBibliographHelpers';
	}

	/**
	 * Get the record folder path for a given source.
	 *
	 * @param {string} pSourceHash - The source hash.
	 * @returns {string} The absolute path to the record folder.
	 */
	getRecordFolderPath(pSourceHash)
	{
		let tmpStorage = this.fable.BibliographStorage;
		return tmpStorage.getSourceRecordFolderPath(pSourceHash);
	}

	/**
	 * Check if a specific record exists.
	 *
	 * @param {string} pSourceHash - The source hash.
	 * @param {string} pRecordGUID - The record GUID.
	 * @param {function} fCallback - Callback(pError, pExists).
	 */
	exists(pSourceHash, pRecordGUID, fCallback)
	{
		let tmpRecordPath = libPath.join(this.getRecordFolderPath(pSourceHash), `${pRecordGUID}.json`);

		libFS.access(tmpRecordPath, libFS.constants.F_OK,
			(pError) =>
			{
				return fCallback(null, !pError);
			});
	}

	/**
	 * Read all record keys (GUIDs) in a source.
	 *
	 * @param {string} pSourceHash - The source hash.
	 * @param {function} fCallback - Callback(pError, pKeys).
	 */
	readRecordKeys(pSourceHash, fCallback)
	{
		let tmpRecordFolder = this.getRecordFolderPath(pSourceHash);

		if (!libFS.existsSync(tmpRecordFolder))
		{
			return fCallback(null, []);
		}

		libFS.readdir(tmpRecordFolder,
			(pError, pFiles) =>
			{
				if (pError)
				{
					return fCallback(pError);
				}

				// Filter to .json files and strip extension to get GUIDs
				let tmpKeys = [];
				for (let i = 0; i < pFiles.length; i++)
				{
					let tmpFile = pFiles[i];
					if (tmpFile.endsWith('.json'))
					{
						tmpKeys.push(tmpFile.slice(0, -5)); // Remove .json extension
					}
				}
				return fCallback(null, tmpKeys);
			});
	}

	/**
	 * Read delta history for a record.
	 *
	 * @param {string} pSourceHash - The source hash.
	 * @param {string} pRecordGUID - The record GUID.
	 * @param {function} fCallback - Callback(pError, pDelta).
	 */
	readRecordDelta(pSourceHash, pRecordGUID, fCallback)
	{
		let tmpStorage = this.fable.BibliographStorage;
		let tmpHistoryFolder = tmpStorage.getSourceHistoryFolderPath(pSourceHash);
		let tmpDeltaPath = libPath.join(tmpHistoryFolder, `_${pRecordGUID}_deltas.json`);

		if (!libFS.existsSync(tmpDeltaPath))
		{
			return fCallback(null, null);
		}

		libFS.readFile(tmpDeltaPath, 'utf8',
			(pError, pData) =>
			{
				if (pError)
				{
					return fCallback(pError);
				}
				try
				{
					return fCallback(null, JSON.parse(pData));
				}
				catch (pParseError)
				{
					return fCallback(pParseError);
				}
			});
	}
}

module.exports = ParimeBibliographHelpers;
module.exports.default_options = _DefaultOptions;
