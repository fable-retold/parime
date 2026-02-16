const libOratorEndpoint = require('../orator-extensions/Orator-Endpoint.js');
const libFS = require('fs');

const _DefaultOptions = (
	{
		"EndpointIdentifier": 'JSON-Post',
		"EndpointMethods": {
			"POST":
				[
					{
						"Path": "/JSON/*",
						"Function": "postParimeJSON"
					}
				]
		},
	});

class ParimeJSONPost extends libOratorEndpoint
{
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		this.fileStorageRoot = (typeof(pFable.settings.ParimeFileStorageRoot) !== 'undefined') ? pFable.settings.ParimeFileStorageRoot : `${process.cwd()}/`;	
	}

	postParimeJSON(pRequest, pResponse, fNext)
	{
		this.fable.log.info(`Parime JSON Post received`);

		let tmpBuffer = Buffer.alloc(0); // Initialize an empty buffer

		// Handle incoming data chunks
		pRequest.on('data', (chunk) =>
		{
			tmpBuffer = Buffer.concat([tmpBuffer, chunk]); // Append received chunk
		});

		// Handle request end
		pRequest.on('end', () =>
		{
			console.log(`Received ${tmpBuffer.length} bytes`);

			// Save to a file (e.g., "uploaded.bin")
			libFS.writeFile('uploaded.bin', tmpBuffer, (pWriteError) =>
			{
				if (pWriteError)
				{
					console.error('Error saving file:', pWriteError);
					pResponse.send(500, { error: 'File save failed' });
				} else
				{
					pResponse.send(200, { message: 'File uploaded successfully', size: tmpBuffer.length });
				}
				return fNext();
			});
		});

		// Handle request errors
		pRequest.on('error', (err) =>
		{
			console.error('Request Error:', err);
			pResponse.send(500, { error: 'Upload failed' });
			return fNext();
		});
	}
}

module.exports = ParimeJSONPost;
module.exports.default_options = _DefaultOptions;