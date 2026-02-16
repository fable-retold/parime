const libFableServiceBase = require('fable-serviceproviderbase');

const _DefaultOptions = (
	{
	});

class ParimeLakeValidation extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		this.serviceType = 'ParimeLakeValidation';
	}

	/**
	 * Validate a category string.
	 * Must be a non-empty string starting with an alpha character, followed by alphanumeric characters, hyphens, or underscores.
	 *
	 * @param {string} pCategory - The category to validate.
	 * @returns {boolean} True if valid.
	 */
	validateCategory(pCategory)
	{
		if (!pCategory || (typeof(pCategory) !== 'string'))
		{
			return false;
		}
		// Must start with alpha, then alphanumeric/hyphen/underscore
		return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(pCategory);
	}

	/**
	 * Validate a hash string.
	 * Must be a non-empty string.
	 *
	 * @param {string} pHash - The hash to validate.
	 * @returns {boolean} True if valid.
	 */
	validateHash(pHash)
	{
		if (!pHash || (typeof(pHash) !== 'string'))
		{
			return false;
		}
		return (pHash.length > 0);
	}

	/**
	 * Sanitize a binary path hash.
	 * Forward slashes create nested directories. Prevent path traversal attacks.
	 *
	 * @param {string} pHash - The hash that may contain forward slashes.
	 * @returns {string|false} The sanitized hash, or false if invalid.
	 */
	sanitizeBinaryPath(pHash)
	{
		if (!pHash || (typeof(pHash) !== 'string'))
		{
			return false;
		}

		// Reject absolute paths
		if (pHash.startsWith('/') || pHash.startsWith('\\'))
		{
			return false;
		}

		// Reject path traversal attempts
		let tmpSegments = pHash.split('/');
		for (let i = 0; i < tmpSegments.length; i++)
		{
			let tmpSegment = tmpSegments[i];
			// Reject empty segments (double slashes), dot-dot, or segments starting with dot
			if (tmpSegment === '' || tmpSegment === '..' || tmpSegment === '.')
			{
				return false;
			}
			// Reject backslash in segments
			if (tmpSegment.indexOf('\\') >= 0)
			{
				return false;
			}
		}

		return pHash;
	}

	/**
	 * Send a consistent error response.
	 *
	 * @param {object} pResponse - The Restify response object.
	 * @param {number} pStatusCode - The HTTP status code.
	 * @param {string} pMessage - The error message.
	 * @param {function} fNext - The Restify next function.
	 */
	sendError(pResponse, pStatusCode, pMessage, fNext)
	{
		pResponse.send(pStatusCode, { Error: pMessage });
		return fNext();
	}
}

module.exports = ParimeLakeValidation;
module.exports.default_options = _DefaultOptions;
