const libFableServiceBase = require('fable-serviceproviderbase');

const libOrator = require('orator');
const libOratorHTTPProxy = require(`orator-http-proxy`);
const libOratorServiceServerRestify = require('orator-serviceserver-restify');

// Pull in the default fable/pict options
const libDefaultServerOptions = require('./Parime-Server-Options.json');

// Inject the package.json for the service
libDefaultServerOptions._package = require('../package.json');
libDefaultServerOptions.ProductVersion = libDefaultServerOptions._package.version;

const libOratorEndpoint = require('./orator-extensions/Orator-Endpoint.js');
const libParemeJSONPost = require('./endpoints/Parime-JSON-Post.js');

class ParimeWebServer extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		// TODO: This technically requires a pict object, not a fable object.
		//       Discuss how we want to do this detection.
		//       And.  If what was passed in is a fable, we should make a simple mechanism for "upcasting" it to pict within pict.

		// Create the Restify ServiceServer service (this causes Orator to serve via the http protocol instead of ipc)
		if (!'OratorServiceServer' in this.fable)
		{
			this.fable.addServiceType('OratorServiceServer', libOratorServiceServerRestify);
			this.fable.instantiateServiceProvider('OratorServiceServer', 
				{
					RestifyConfiguration: { strictNext: true }
				});
		}

		// Load and add Orator
		if (!'Orator' in this.fable)
		{
			this.fable.serviceManager.addServiceType('Orator', libOrator);
			this.fable.serviceManager.instantiateServiceProvider('Orator');
		}
	}

	initialize(fCallback)
	{
		let tmpAnticipate = this.fable.newAnticipate();

		let _Orator = this.fable.Orator;

		// Initialize the Orator server
		tmpAnticipate.anticipate(_Orator.initialize.bind(_Orator));

		// Create a simple custom endpoint on the server.
		tmpAnticipate.anticipate(
			(fStageComplete)=>
			{
				// Create an endpoint.  This can also be done after the service is started.
				_Orator.serviceServer.get
				(
					'/1.0/test/:hash',
					(pRequest, pResponse, fNext) =>
					{
						// Send back the request parameters
						pResponse.send(pRequest.params);
						_Orator.fable.log.info(`Endpoint sent parameters object:`, pRequest.params);
						return fNext();
					}
				);
				return fStageComplete();
			});

		tmpAnticipate.anticipate(
			(fStageComplete)=>
			{
				// Create an endpoint.  This can also be done after the service is started.
				libOratorEndpoint.addEndpoint('JsonPost', libParemeJSONPost, fStageComplete, _Orator);
			});

		tmpAnticipate.anticipate(
			(fStageComplete) =>
			{
				_Orator.addStaticRoute(`${__dirname}/`);
				return fStageComplete();
			}
		)

		// Add the http proxy service
		this.fable.serviceManager.addServiceType('OratorHTTPProxy', libOratorHTTPProxy);
		this.fable.serviceManager.instantiateServiceProvider('OratorHTTPProxy', {LogLevel: 2});
		// Proxy all /1.0/ requests to the locally-running bookstore service (you need to run this from https://github.com/stevenvelozo/retold-harness ... it's a one-liner to start the service)
		tmpAnticipate.anticipate(
			(fNext)=>
			{
				this.fable.OratorHTTPProxy.connectProxyRoutes();
				return fNext();
			});

		// Now start the service server.
		tmpAnticipate.anticipate(_Orator.startService.bind(_Orator));

		tmpAnticipate.wait(
			(pError)=>
			{
				if (pError)
				{
					this.fable.log.error('Error initializing Orator Service Server: '+pError.message, pError);
					return fCallback(pError);
				}
				this.fable.log.info('Orator Service Server Initialized.');
				return fCallback();
			});
	}
}

module.exports = ParimeWebServer;