const libFableServiceBase = require('fable-serviceproviderbase');

/**
 * ExternalStorageAdapter -- the base contract for a durable, out-of-process blob
 * backend that Parime-TieredBinaryStorage uses as its system of record.
 *
 * The tiered store keeps a local filesystem CACHE (a ParimeBinaryStorage) in
 * front of one of these DURABLE backends. Everything the tiered store needs from
 * the durable tier is expressed here, keyed by a single opaque string key (the
 * tiered store composes it as "<category>/<hash>"), so the same pattern fits in
 * front of object storage (S3 / R2), a mounted filesystem (NFS / SMB), FTP / SFTP,
 * or anything else that can put, get, head, delete, and list by key.
 *
 * Subclasses implement the verbs. Two are OPTIONAL capabilities rather than
 * requirements, and a caller must check capabilities() before relying on them:
 *   - getStream: a streaming read (so large media is not buffered in memory).
 *   - presignGet: a time-limited direct-download URL (the "serve direct, never
 *     proxy" path). Object stores implement it; a filesystem or FTP backend does
 *     not, and the tiered store falls back to proxy-through-cache on those.
 *
 * All methods are callback-style ((pError, ...)) to match ParimeBinaryStorage.
 * A missing object is NOT an error: get yields (null, null), head yields
 * (null, { Exists: false }), and delete of an absent key succeeds.
 *
 * @author Steven Velozo <steven@velozo.com>
 * @license MIT
 */
class ParimeExternalStorageAdapter extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.serviceType = 'ParimeExternalStorageAdapter';
		// A short label for logs and for the tiered store to report which backend is wired.
		this.adapterType = 'external';
	}

	/**
	 * Prepare the backend for use (open a client, ensure a root, verify reachability).
	 * @param {function} fCallback - Callback(pError).
	 */
	initialize(fCallback)
	{
		return fCallback();
	}

	/**
	 * Store bytes under a key, overwriting any existing object at that key.
	 * @param {string} pKey - The object key ("<category>/<hash>").
	 * @param {Buffer} pBuffer - The bytes to store.
	 * @param {object} pOptions - { ContentType?, Size? }.
	 * @param {function} fCallback - Callback(pError).
	 */
	put(pKey, pBuffer, pOptions, fCallback)
	{
		return fCallback(new Error(`ParimeExternalStorageAdapter.put is not implemented by [${this.adapterType}].`));
	}

	/**
	 * Read all bytes for a key. A missing key yields (null, null), never an error.
	 * @param {string} pKey - The object key.
	 * @param {function} fCallback - Callback(pError, pBuffer).
	 */
	get(pKey, fCallback)
	{
		return fCallback(new Error(`ParimeExternalStorageAdapter.get is not implemented by [${this.adapterType}].`));
	}

	/**
	 * Open a readable stream for a key (optional capability; check capabilities().Stream).
	 * A missing key yields (null, null). Byte ranges come from pOptions.start / pOptions.end.
	 * Callback-style because opening a remote stream is itself asynchronous.
	 * @param {string} pKey - The object key.
	 * @param {object} pOptions - { start?, end? }.
	 * @param {function} fCallback - Callback(pError, pReadableStream).
	 */
	getStream(pKey, pOptions, fCallback)
	{
		return fCallback(new Error(`ParimeExternalStorageAdapter.getStream is not implemented by [${this.adapterType}].`));
	}

	/**
	 * Metadata for a key without transferring the body.
	 * @param {string} pKey - The object key.
	 * @param {function} fCallback - Callback(pError, { Exists, Size, ETag }).
	 */
	head(pKey, fCallback)
	{
		return fCallback(new Error(`ParimeExternalStorageAdapter.head is not implemented by [${this.adapterType}].`));
	}

	/**
	 * Delete a key. Deleting an absent key is a success.
	 * @param {string} pKey - The object key.
	 * @param {function} fCallback - Callback(pError).
	 */
	delete(pKey, fCallback)
	{
		return fCallback(new Error(`ParimeExternalStorageAdapter.delete is not implemented by [${this.adapterType}].`));
	}

	/**
	 * List keys under a prefix (for reconcile and garbage collection).
	 * @param {string} pPrefix - The key prefix ("<category>/"), or '' for all.
	 * @param {function} fCallback - Callback(pError, pKeys).
	 */
	list(pPrefix, fCallback)
	{
		return fCallback(new Error(`ParimeExternalStorageAdapter.list is not implemented by [${this.adapterType}].`));
	}

	/**
	 * A time-limited direct-download URL for a key (optional; check capabilities().Presign).
	 * The base returns (null, null) so a backend that cannot presign simply has no
	 * direct-serve path and the tiered store proxies through the cache instead.
	 * @param {string} pKey - The object key.
	 * @param {object} pOptions - { ExpiresInSeconds?, FileName?, ContentType? }.
	 * @param {function} fCallback - Callback(pError, pURL).
	 */
	presignGet(pKey, pOptions, fCallback)
	{
		return fCallback(null, null);
	}

	/**
	 * Which optional capabilities this backend supports.
	 * @returns {object} { Presign: boolean, Stream: boolean }.
	 */
	capabilities()
	{
		return ({ Presign: false, Stream: false });
	}
}

module.exports = ParimeExternalStorageAdapter;
