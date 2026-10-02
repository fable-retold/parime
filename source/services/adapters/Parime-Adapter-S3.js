const libExternalStorageAdapter = require('../Parime-ExternalStorageAdapter.js');
const libAWS = require('aws4fetch');
const libStream = require('stream');

/**
 * S3-compatible durable backend for Parime-TieredBinaryStorage.
 *
 * Works with Cloudflare R2, MinIO, and any S3-compatible object store. Requests
 * are signed with AWS SigV4 by aws4fetch (a dependency-free, audited SigV4-over-
 * fetch library): the secret access key derives a per-request signature locally
 * and is never transmitted; traffic goes over TLS to the configured endpoint.
 *
 * Objects are addressed path-style ("<endpoint>/<bucket>/<prefix><key>"), which
 * both R2 and MinIO accept, so the same adapter serves either with no virtual-host
 * DNS setup.
 *
 * Configuration (pOptions):
 *   {
 *     Endpoint: 'https://<account>.r2.cloudflarestorage.com',   // required
 *     Bucket: 'plansheet-media-prod',                            // required
 *     Region: 'auto',                                            // R2 uses 'auto'
 *     AccessKeyId: '...',                                        // required
 *     SecretAccessKey: '...',                                    // required
 *     SessionToken: '...',                                       // optional
 *     Prefix: '',                                                // optional key namespace
 *     PresignExpiresSeconds: 300                                 // default direct-serve URL lifetime
 *   }
 *
 * @author Steven Velozo <steven@velozo.com>
 * @license MIT
 */
class ParimeAdapterS3 extends libExternalStorageAdapter
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.adapterType = 's3';

		let tmpOptions = this.options || {};
		this.endpoint = String(tmpOptions.Endpoint || '').replace(/\/+$/, '');
		this.bucket = String(tmpOptions.Bucket || '');
		this.region = String(tmpOptions.Region || 'auto');
		this.accessKeyId = String(tmpOptions.AccessKeyId || '');
		this.secretAccessKey = String(tmpOptions.SecretAccessKey || '');
		this.sessionToken = tmpOptions.SessionToken ? String(tmpOptions.SessionToken) : '';
		// Normalize the prefix to '' or 'something/' (no leading slash, one trailing slash).
		let tmpPrefix = String(tmpOptions.Prefix || '').replace(/^\/+/, '').replace(/\/+$/, '');
		this.prefix = tmpPrefix ? (tmpPrefix + '/') : '';
		this.presignExpiresSeconds = Number(tmpOptions.PresignExpiresSeconds) || 300;

		this._aws = null;
	}

	// Build the signing client once (synchronous, no network). Called by initialize
	// and lazily by every operation, so signing / presigning works without a prior
	// network round-trip.
	_ensureClient()
	{
		if (this._aws) { return; }
		let tmpClientOptions = { accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey, service: 's3', region: this.region };
		if (this.sessionToken) { tmpClientOptions.sessionToken = this.sessionToken; }
		this._aws = new libAWS.AwsClient(tmpClientOptions);
	}

	initialize(fCallback)
	{
		let tmpMissing = [];
		if (!this.endpoint) { tmpMissing.push('Endpoint'); }
		if (!this.bucket) { tmpMissing.push('Bucket'); }
		if (!this.accessKeyId) { tmpMissing.push('AccessKeyId'); }
		if (!this.secretAccessKey) { tmpMissing.push('SecretAccessKey'); }
		if (tmpMissing.length)
		{
			return fCallback(new Error(`Parime S3 backend is missing required configuration: ${tmpMissing.join(', ')}.`));
		}

		this._ensureClient();

		// Best-effort connectivity + credential check. A definitive auth failure
		// (401/403) is a misconfiguration and fails boot loudly; a network/5xx blip
		// is logged but not fatal, so a transient hiccup does not crash startup.
		let tmpSelf = this;
		let tmpPingURL = `${this.endpoint}/${this.bucket}?list-type=2&max-keys=0`;
		this._aws.fetch(tmpPingURL, { method: 'GET' })
			.then((pResponse) =>
			{
				if ((pResponse.status === 401) || (pResponse.status === 403))
				{
					return fCallback(new Error(`Parime S3 backend rejected the credentials (HTTP ${pResponse.status}) at [${tmpSelf.endpoint}/${tmpSelf.bucket}]. Check AccessKeyId/SecretAccessKey and the bucket name.`));
				}
				if (!pResponse.ok && (pResponse.status !== 404))
				{
					tmpSelf.fable.log.warn(`Parime S3 backend connectivity check returned HTTP ${pResponse.status}; continuing.`);
				}
				else
				{
					tmpSelf.fable.log.info(`Parime S3 durable backend initialized at [${tmpSelf.endpoint}/${tmpSelf.bucket}] (region ${tmpSelf.region}).`);
				}
				return fCallback();
			})
			.catch((pError) =>
			{
				tmpSelf.fable.log.warn(`Parime S3 backend connectivity check could not reach [${tmpSelf.endpoint}]: ${pError.message}; continuing (writes will surface errors).`);
				return fCallback();
			});
	}

	// Percent-encode a key for a URL path, preserving '/' as the path separator.
	_encodeKeyPath(pKey)
	{
		return String(pKey).split('/').map((pSegment) => encodeURIComponent(pSegment)).join('/');
	}

	_objectURL(pKey)
	{
		return `${this.endpoint}/${this.bucket}/${this._encodeKeyPath(this.prefix + pKey)}`;
	}

	put(pKey, pBuffer, pOptions, fCallback)
	{
		this._ensureClient();
		let tmpHeaders = {};
		if (pOptions && pOptions.ContentType) { tmpHeaders['Content-Type'] = pOptions.ContentType; }
		this._aws.fetch(this._objectURL(pKey), { method: 'PUT', body: pBuffer, headers: tmpHeaders })
			.then((pResponse) =>
			{
				if (!pResponse.ok)
				{
					return pResponse.text().then((pText) => fCallback(new Error(`S3 put [${pKey}] failed: HTTP ${pResponse.status} ${pText.slice(0, 200)}`)));
				}
				return fCallback();
			})
			.catch((pError) => fCallback(pError));
	}

	get(pKey, fCallback)
	{
		this._ensureClient();
		this._aws.fetch(this._objectURL(pKey), { method: 'GET' })
			.then((pResponse) =>
			{
				if (pResponse.status === 404) { return fCallback(null, null); }
				if (!pResponse.ok)
				{
					return pResponse.text().then((pText) => fCallback(new Error(`S3 get [${pKey}] failed: HTTP ${pResponse.status} ${pText.slice(0, 200)}`)));
				}
				return pResponse.arrayBuffer().then((pArrayBuffer) => fCallback(null, Buffer.from(pArrayBuffer)));
			})
			.catch((pError) => fCallback(pError));
	}

	getStream(pKey, pOptions, fCallback)
	{
		this._ensureClient();
		let tmpHeaders = {};
		if (pOptions && (typeof(pOptions.start) === 'number'))
		{
			let tmpEnd = (typeof(pOptions.end) === 'number') ? pOptions.end : '';
			tmpHeaders['Range'] = `bytes=${pOptions.start}-${tmpEnd}`;
		}
		this._aws.fetch(this._objectURL(pKey), { method: 'GET', headers: tmpHeaders })
			.then((pResponse) =>
			{
				if (pResponse.status === 404) { return fCallback(null, null); }
				if (!pResponse.ok)
				{
					return pResponse.text().then((pText) => fCallback(new Error(`S3 getStream [${pKey}] failed: HTTP ${pResponse.status} ${pText.slice(0, 200)}`)));
				}
				if (!pResponse.body) { return fCallback(null, null); }
				// Convert the web ReadableStream to a Node Readable for the tiered store.
				return fCallback(null, libStream.Readable.fromWeb(pResponse.body));
			})
			.catch((pError) => fCallback(pError));
	}

	head(pKey, fCallback)
	{
		this._ensureClient();
		this._aws.fetch(this._objectURL(pKey), { method: 'HEAD' })
			.then((pResponse) =>
			{
				if (pResponse.status === 404) { return fCallback(null, { Exists: false, Size: 0, ETag: '' }); }
				if (!pResponse.ok)
				{
					return fCallback(new Error(`S3 head [${pKey}] failed: HTTP ${pResponse.status}`));
				}
				let tmpSize = Number(pResponse.headers.get('content-length') || 0);
				let tmpETag = pResponse.headers.get('etag') || '';
				return fCallback(null, { Exists: true, Size: tmpSize, ETag: tmpETag });
			})
			.catch((pError) => fCallback(pError));
	}

	delete(pKey, fCallback)
	{
		this._ensureClient();
		this._aws.fetch(this._objectURL(pKey), { method: 'DELETE' })
			.then((pResponse) =>
			{
				// S3 delete is idempotent: 204 on delete, 404 if already gone -- both success.
				if (pResponse.ok || (pResponse.status === 404)) { return fCallback(); }
				return fCallback(new Error(`S3 delete [${pKey}] failed: HTTP ${pResponse.status}`));
			})
			.catch((pError) => fCallback(pError));
	}

	list(pPrefix, fCallback)
	{
		this._ensureClient();
		let tmpSelf = this;
		let tmpQueryPrefix = this.prefix + (pPrefix || '');
		let tmpKeys = [];

		let fPage = (pContinuationToken) =>
		{
			let tmpURL = `${tmpSelf.endpoint}/${tmpSelf.bucket}?list-type=2&prefix=${encodeURIComponent(tmpQueryPrefix)}`;
			if (pContinuationToken) { tmpURL = tmpURL + `&continuation-token=${encodeURIComponent(pContinuationToken)}`; }
			tmpSelf._aws.fetch(tmpURL, { method: 'GET' })
				.then((pResponse) =>
				{
					if (!pResponse.ok)
					{
						return pResponse.text().then((pText) => fCallback(new Error(`S3 list failed: HTTP ${pResponse.status} ${pText.slice(0, 200)}`)));
					}
					return pResponse.text().then((pXML) =>
					{
						let tmpMatch;
						let tmpKeyPattern = /<Key>([\s\S]*?)<\/Key>/g;
						while ((tmpMatch = tmpKeyPattern.exec(pXML)) !== null)
						{
							let tmpFullKey = tmpSelf._xmlUnescape(tmpMatch[1]);
							// Strip the configured bucket prefix so callers see logical keys.
							let tmpLogical = (tmpSelf.prefix && tmpFullKey.indexOf(tmpSelf.prefix) === 0) ? tmpFullKey.substring(tmpSelf.prefix.length) : tmpFullKey;
							tmpKeys.push(tmpLogical);
						}
						let tmpTruncated = /<IsTruncated>\s*true\s*<\/IsTruncated>/i.test(pXML);
						let tmpTokenMatch = /<NextContinuationToken>([\s\S]*?)<\/NextContinuationToken>/.exec(pXML);
						if (tmpTruncated && tmpTokenMatch)
						{
							return fPage(tmpSelf._xmlUnescape(tmpTokenMatch[1]));
						}
						return fCallback(null, tmpKeys);
					});
				})
				.catch((pError) => fCallback(pError));
		};

		fPage(null);
	}

	_xmlUnescape(pValue)
	{
		return String(pValue)
			.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&amp;/g, '&');
	}

	presignGet(pKey, pOptions, fCallback)
	{
		this._ensureClient();
		let tmpOptions = pOptions || {};
		let tmpExpires = Number(tmpOptions.ExpiresInSeconds) || this.presignExpiresSeconds;
		let tmpURL = `${this._objectURL(pKey)}?X-Amz-Expires=${tmpExpires}`;
		// Optional response overrides so the browser downloads with a friendly name / type.
		if (tmpOptions.FileName)
		{
			tmpURL = tmpURL + `&response-content-disposition=${encodeURIComponent('attachment; filename="' + String(tmpOptions.FileName).replace(/"/g, '') + '"')}`;
		}
		if (tmpOptions.ContentType)
		{
			tmpURL = tmpURL + `&response-content-type=${encodeURIComponent(tmpOptions.ContentType)}`;
		}

		this._aws.sign(tmpURL, { method: 'GET', aws: { signQuery: true } })
			.then((pSignedRequest) => fCallback(null, pSignedRequest.url))
			.catch((pError) => fCallback(pError));
	}

	capabilities()
	{
		return ({ Presign: true, Stream: true });
	}
}

module.exports = ParimeAdapterS3;
