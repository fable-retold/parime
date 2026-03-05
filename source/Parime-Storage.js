/**
 * Parime Storage — Headless (No HTTP Server) Entry Point
 *
 * Provides direct access to Parime's storage services (BinaryStorage and
 * Bibliograph) without running an HTTP server.  Useful for embedding Parime
 * as a storage layer inside another application (e.g. retold-remote).
 *
 * Usage:
 *   const libParimeStorage = require('parime/source/Parime-Storage.js');
 *   const libFable = require('fable');
 *
 *   let tmpFable = new libFable({
 *       ParimeBinaryStorageRoot: './my-cache/',
 *       ParimeBinarySharding: { Enabled: true, SegmentSize: 2, Depth: 4 }
 *   });
 *
 *   tmpFable.addServiceType('ParimeStorage', libParimeStorage);
 *   let tmpStorage = tmpFable.instantiateServiceProvider('ParimeStorage');
 *
 *   tmpStorage.initialize((pError) => {
 *       // Now use tmpFable.ParimeBinaryStorage and tmpFable.Bibliograph directly.
 *   });
 */

const libFableServiceBase = require('fable-serviceproviderbase');

const libParimeLakeValidation = require('./services/Parime-LakeValidation.js');
const libParimeBinaryStorage = require('./services/Parime-BinaryStorage.js');
const libBibliograph = require('bibliograph');
const libParimeBibliographHelpers = require('./services/Parime-BibliographHelpers.js');

class ParimeStorage extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.serviceType = 'ParimeStorage';

		if (!('ParimeLakeValidation' in this.fable))
		{
			this.fable.addServiceType('ParimeLakeValidation', libParimeLakeValidation);
			this.fable.instantiateServiceProvider('ParimeLakeValidation');
		}

		if (!('ParimeBinaryStorage' in this.fable))
		{
			this.fable.addServiceType('ParimeBinaryStorage', libParimeBinaryStorage);
			this.fable.instantiateServiceProvider('ParimeBinaryStorage');
		}

		if (!('Bibliograph' in this.fable))
		{
			this.fable.addServiceType('Bibliograph', libBibliograph);
			this.fable.instantiateServiceProvider('Bibliograph');
		}

		if (!('ParimeBibliographHelpers' in this.fable))
		{
			this.fable.addServiceType('ParimeBibliographHelpers', libParimeBibliographHelpers);
			this.fable.instantiateServiceProvider('ParimeBibliographHelpers');
		}
	}

	initialize(fCallback)
	{
		let tmpAnticipate = this.fable.newAnticipate();

		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				this.fable.Bibliograph.initialize(fStageComplete);
			});

		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				this.fable.ParimeBinaryStorage.initialize(fStageComplete);
			});

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error('Error initializing Parime Storage: ' + pError.message, pError);
					return fCallback(pError);
				}
				this.fable.log.info('Parime Storage initialized (headless mode).');
				return fCallback();
			});
	}
}

module.exports = ParimeStorage;
