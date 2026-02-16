const libOratorEndpoint = require('../orator-extensions/Orator-Endpoint.js');
const libParimeWebSocketHandler = require('../services/Parime-WebSocketHandler.js');

const _DefaultOptions = (
	{
		"EndpointIdentifier": 'WebSocket',
		"EndpointMethods":
		{
			"GET":
				[
					{
						"Path": "/1.0/WebSocket/Lake",
						"Function": "handleUpgrade"
					}
				]
		}
	});

class EndpointWebSocket extends libOratorEndpoint
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
	}

	onInitialize(fCallback)
	{
		// Wire the WebSocket handler service
		if (!('ParimeWebSocketHandler' in this.fable))
		{
			this.fable.addServiceType('ParimeWebSocketHandler', libParimeWebSocketHandler);
			this.fable.instantiateServiceProvider('ParimeWebSocketHandler');
		}
		return fCallback();
	}

	/**
	 * GET /1.0/WebSocket/Lake
	 * Handle WebSocket upgrade requests.
	 */
	handleUpgrade(pRequest, pResponse, fNext)
	{
		let tmpWSHandler = this.fable.ParimeWebSocketHandler;

		// Check if this is an upgrade request
		if (!pRequest.isUpgradeRequest || !pRequest.isUpgradeRequest())
		{
			// Not an upgrade request — check headers manually
			let tmpUpgradeHeader = (pRequest.headers['upgrade'] || '').toLowerCase();
			let tmpConnectionHeader = (pRequest.headers['connection'] || '').toLowerCase();

			if (tmpUpgradeHeader !== 'websocket' || tmpConnectionHeader.indexOf('upgrade') < 0)
			{
				pResponse.send(400, { Error: 'This endpoint requires a WebSocket upgrade request.' });
				return fNext();
			}
		}

		try
		{
			let tmpUpgrade = pResponse.claimUpgrade();
			let tmpSocket = tmpUpgrade.socket;
			let tmpHead = tmpUpgrade.head;

			if (!tmpWSHandler.performHandshake(pRequest, tmpSocket, tmpHead))
			{
				return; // Socket was destroyed in performHandshake
			}

			this.fable.log.info('WebSocket connection established.');
			tmpWSHandler.handleConnection(tmpSocket);
		}
		catch (pError)
		{
			this.fable.log.error(`WebSocket upgrade error: ${pError.message}`, pError);
			pResponse.send(500, { Error: `WebSocket upgrade failed: ${pError.message}` });
			return fNext();
		}
	}
}

module.exports = EndpointWebSocket;
module.exports.default_options = _DefaultOptions;
