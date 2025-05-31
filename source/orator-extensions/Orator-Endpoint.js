const libFableServiceBase = require('fable-serviceproviderbase');

const _DefaultOptions = (
	{
		EndpointIdentifier: false
	});

class OratorEndpoint extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
		if (!this.options.EndpointIdentifier)
		{
			this.EndpointIdentifier = `AutoEndpointID-${this.fable.getUUID()}`;
		}
		else
		{
			this.EndpointIdentifier = this.options.EndpointIdentifier;
		}

		// Convenience and consistency naming
		this.pict = this.fable;
		// Wire in the essential Pict application state
		this.AppData = this.pict.AppData;

		this.initializeTimestamp = false;
	}

	onBeforeInitialize(fCallback)
	{
		return fCallback();
	}
	onInitialize(fCallback)
	{
		return fCallback();
	}

	onAfterInitialize(fCallback)
	{
		return fCallback();
	}

	initialize(fCallback)
	{
		let tmpAnticipate = this.fable.newAnticipate();

		tmpAnticipate.anticipate(this.onBeforeInitialize.bind(this));
		tmpAnticipate.anticipate(this.onInitialize.bind(this));
		tmpAnticipate.anticipate(
			(fCallback) =>
			{
				this.initializeTimestamp = +new Date();
				this.fable.log.info(`Orator Endpoint initialized at ${this.initializeTimestamp}.`);
				return fCallback();
			});
		tmpAnticipate.anticipate(this.onAfterInitialize.bind(this));

		tmpAnticipate.wait(fCallback);
	}

	// This needs to be added to orator
	static addEndpoint(pEndpointHash, pEndpointClass, fCallback, pOrator)
	{
		let tmpCallback = (typeof(fCallback) === 'function') ? fCallback : () => {};

		if (typeof(pOrator) != 'object')
		{
			pOrator = this.fable.Orator;
		}

		if (!('endpoints' in pOrator))
		{
			pOrator.endpoints = {};
		}

		let libEndpointClass = pEndpointClass;
		let tmpEndpointOptions = (typeof(pEndpointClass.default_options) === 'object') ? pEndpointClass.default_options : {};

		let tmpEndpoint = new libEndpointClass(pOrator.fable, tmpEndpointOptions, this.serviceHash);

		return tmpEndpoint.initialize(
			(pError) =>
			{
				if (pError)
				{
					pOrator.log.error(`Error initializing endpoint [${tmpEndpoint.EndpointIdentifier}]:`, pError);
					return tmpCallback(pError);
				}

				pOrator.endpoints[pEndpointHash] = tmpEndpoint;

				// Now map the specific verb and method in
				let tmpHttpVerbSet = Object.keys(tmpEndpoint.options.EndpointMethods);
				for(let i = 0; i < tmpHttpVerbSet.length; i++)
				{
					let tmpHttpVerb = tmpHttpVerbSet[i];
					let tmpMethodSet = tmpEndpoint.options.EndpointMethods[tmpHttpVerb];
					for(let j = 0; j < tmpMethodSet.length; j++)
					{
						let tmpMethod = tmpMethodSet[j];
						pOrator.log.info(`Mapping endpoint [${tmpEndpoint.EndpointIdentifier}] method [${tmpMethod.Function}] to path [${tmpMethod.Path}] with verb [${tmpHttpVerb}].`);
						pOrator.serviceServer[tmpHttpVerb.toLowerCase()](tmpMethod.Path, tmpEndpoint[tmpMethod.Function].bind(tmpEndpoint));
					}
				}

				pOrator.log.info(`Endpoint [${tmpEndpoint.EndpointIdentifier}] initialized.`);
				return tmpCallback();
			});
	}
}

module.exports = OratorEndpoint;
module.exports.default_options = _DefaultOptions;
