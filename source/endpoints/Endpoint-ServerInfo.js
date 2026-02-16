const libOratorEndpoint = require('../orator-extensions/Orator-Endpoint.js');
const libFS = require('fs');
const libPath = require('path');

const _DefaultOptions = (
	{
		"EndpointIdentifier": 'ServerInfo',
		"EndpointMethods":
		{
			"GET":
				[
					{
						"Path": "/1.0/ServerInfo",
						"Function": "getServerInfo"
					},
					{
						"Path": "/1.0/ServerInfo/Lakes",
						"Function": "getLakesSummary"
					}
				]
		}
	});

class EndpointServerInfo extends libOratorEndpoint
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		// Record the server start time
		this._StartTime = new Date();
	}

	/**
	 * Format an uptime duration in seconds into a human-readable string.
	 *
	 * @param {number} pSeconds - The number of seconds.
	 * @returns {string} Human-readable duration.
	 */
	formatUptime(pSeconds)
	{
		let tmpDays = Math.floor(pSeconds / 86400);
		let tmpHours = Math.floor((pSeconds % 86400) / 3600);
		let tmpMinutes = Math.floor((pSeconds % 3600) / 60);
		let tmpSecs = Math.floor(pSeconds % 60);

		let tmpParts = [];
		if (tmpDays > 0) { tmpParts.push(`${tmpDays}d`); }
		if (tmpHours > 0) { tmpParts.push(`${tmpHours}h`); }
		if (tmpMinutes > 0) { tmpParts.push(`${tmpMinutes}m`); }
		tmpParts.push(`${tmpSecs}s`);

		return tmpParts.join(' ');
	}

	/**
	 * GET /1.0/ServerInfo
	 * Returns server product, version, port, uptime and configuration.
	 */
	getServerInfo(pRequest, pResponse, fNext)
	{
		let tmpSettings = this.fable.settings;
		let tmpUptimeSeconds = (Date.now() - this._StartTime.getTime()) / 1000;

		let tmpInfo =
		{
			Product: tmpSettings.Product || 'Parime',
			Version: tmpSettings.ProductVersion || '1.0.0',
			Port: tmpSettings.APIServerPort || tmpSettings.ServicePort || 9999,
			Uptime: this.formatUptime(tmpUptimeSeconds),
			StartTime: this._StartTime.toISOString(),
			BinaryStorageRoot: tmpSettings.ParimeBinaryStorageRoot || './parime-binary-storage/',
			RestifyConfiguration: tmpSettings.RestifyConfiguration || {}
		};

		pResponse.send(200, tmpInfo);
		return fNext();
	}

	/**
	 * GET /1.0/ServerInfo/Lakes
	 * Returns a summary of all lake categories.
	 */
	getLakesSummary(pRequest, pResponse, fNext)
	{
		let tmpResult =
		{
			Lakes:
			{
				Record: [],
				Binary: [],
				Combined: []
			}
		};

		let tmpAnticipate = this.fable.newAnticipate();

		// Get record lake categories from Bibliograph storage
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				try
				{
					let tmpBibliographStorage = this.fable.BibliographStorage;
					if (tmpBibliographStorage && typeof(tmpBibliographStorage.getDataFolderPath) === 'function')
					{
						let tmpDataFolder = tmpBibliographStorage.getDataFolderPath();
						if (libFS.existsSync(tmpDataFolder))
						{
							let tmpEntries = libFS.readdirSync(tmpDataFolder, { withFileTypes: true });
							for (let i = 0; i < tmpEntries.length; i++)
							{
								if (tmpEntries[i].isDirectory() && !tmpEntries[i].name.startsWith('_') && !tmpEntries[i].name.startsWith('.'))
								{
									tmpResult.Lakes.Record.push(tmpEntries[i].name);
								}
							}
						}
					}
				}
				catch (pError)
				{
					this.fable.log.warn(`Error reading record lake categories: ${pError.message}`);
				}
				return fDone();
			});

		// Get binary lake categories from BinaryStorage root
		tmpAnticipate.anticipate(
			(fDone) =>
			{
				try
				{
					let tmpBinaryStorage = this.fable.ParimeBinaryStorage;
					if (tmpBinaryStorage && tmpBinaryStorage.options)
					{
						let tmpStorageRoot = this.fable.settings.ParimeBinaryStorageRoot || './parime-binary-storage/';
						if (libFS.existsSync(tmpStorageRoot))
						{
							let tmpEntries = libFS.readdirSync(tmpStorageRoot, { withFileTypes: true });
							for (let i = 0; i < tmpEntries.length; i++)
							{
								if (tmpEntries[i].isDirectory() && !tmpEntries[i].name.startsWith('.'))
								{
									tmpResult.Lakes.Binary.push(tmpEntries[i].name);
								}
							}
						}
					}
				}
				catch (pError)
				{
					this.fable.log.warn(`Error reading binary lake categories: ${pError.message}`);
				}
				return fDone();
			});

		// Combined = union of Record and Binary categories
		tmpAnticipate.wait(
			(pError) =>
			{
				// Build the combined categories as the union of record + binary
				let tmpCombinedSet = {};
				for (let i = 0; i < tmpResult.Lakes.Record.length; i++)
				{
					tmpCombinedSet[tmpResult.Lakes.Record[i]] = true;
				}
				for (let i = 0; i < tmpResult.Lakes.Binary.length; i++)
				{
					tmpCombinedSet[tmpResult.Lakes.Binary[i]] = true;
				}
				tmpResult.Lakes.Combined = Object.keys(tmpCombinedSet);

				pResponse.send(200, tmpResult);
				return fNext();
			});
	}
}

module.exports = EndpointServerInfo;
module.exports.default_options = _DefaultOptions;
