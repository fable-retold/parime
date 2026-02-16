const libFableServiceBase = require('fable-serviceproviderbase');

const libOrator = require('orator');
const libOratorServiceServerRestify = require('orator-serviceserver-restify');

// Pull in the default fable/pict options
const libDefaultServerOptions = require('./Parime-Server-Options.json');

// Inject the package.json for the service
libDefaultServerOptions._package = require('../package.json');
libDefaultServerOptions.ProductVersion = libDefaultServerOptions._package.version;

const libOratorEndpoint = require('./orator-extensions/Orator-Endpoint.js');

// Services
const libParimeLakeValidation = require('./services/Parime-LakeValidation.js');
const libParimeBinaryStorage = require('./services/Parime-BinaryStorage.js');
const libBibliograph = require('bibliograph');
const libParimeBibliographHelpers = require('./services/Parime-BibliographHelpers.js');

// Endpoints
const libEndpointRecordLake = require('./endpoints/Endpoint-RecordLake.js');
const libEndpointBinaryLake = require('./endpoints/Endpoint-BinaryLake.js');
const libEndpointCombinedLake = require('./endpoints/Endpoint-CombinedLake.js');
const libEndpointWebSocket = require('./endpoints/Endpoint-WebSocket.js');

class ParimeWebServer extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(libDefaultServerOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		// Create the Restify ServiceServer service (this causes Orator to serve via the http protocol instead of ipc)
		if (!('OratorServiceServer' in this.fable))
		{
			let tmpRestifyConfig = (typeof(this.options.RestifyConfiguration) === 'object')
				? this.options.RestifyConfiguration
				: { strictNext: true, handleUpgrades: true };

			this.fable.addServiceType('OratorServiceServer', libOratorServiceServerRestify);
			this.fable.instantiateServiceProvider('OratorServiceServer',
				{
					RestifyConfiguration: tmpRestifyConfig
				});
		}

		// Load and add Orator
		if (!('Orator' in this.fable))
		{
			this.fable.serviceManager.addServiceType('Orator', libOrator);
			this.fable.serviceManager.instantiateServiceProvider('Orator');
		}

		// Wire core services
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

		let _Orator = this.fable.Orator;

		// Initialize the Orator server
		tmpAnticipate.anticipate(_Orator.initialize.bind(_Orator));

		// Initialize Bibliograph
		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				this.fable.Bibliograph.initialize(fStageComplete);
			});

		// Initialize Binary Storage
		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				this.fable.ParimeBinaryStorage.initialize(fStageComplete);
			});

		// Register Record Lake endpoints
		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				libOratorEndpoint.addEndpoint('RecordLake', libEndpointRecordLake, fStageComplete, _Orator);
			});

		// Register Binary Lake endpoints
		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				libOratorEndpoint.addEndpoint('BinaryLake', libEndpointBinaryLake, fStageComplete, _Orator);
			});

		// Register Combined Lake endpoints
		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				libOratorEndpoint.addEndpoint('CombinedLake', libEndpointCombinedLake, fStageComplete, _Orator);
			});

		// Register WebSocket endpoint
		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				libOratorEndpoint.addEndpoint('WebSocket', libEndpointWebSocket, fStageComplete, _Orator);
			});

		// Now start the service server.
		tmpAnticipate.anticipate(_Orator.startService.bind(_Orator));

		tmpAnticipate.wait(
			(pError) =>
			{
				if (pError)
				{
					this.fable.log.error('Error initializing Parime Service Server: ' + pError.message, pError);
					return fCallback(pError);
				}
				this.fable.log.info('Parime Service Server Initialized.');
				return fCallback();
			});
	}
}

module.exports = ParimeWebServer;
