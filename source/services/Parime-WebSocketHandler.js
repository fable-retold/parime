const libFableServiceBase = require('fable-serviceproviderbase');
const libCrypto = require('crypto');

const WEBSOCKET_MAGIC_GUID = '258EAFA5-E914-47DA-95CA-5AB53FF86510';

const _DefaultOptions = (
	{
	});

class ParimeWebSocketHandler extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(_DefaultOptions)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		this.serviceType = 'ParimeWebSocketHandler';
	}

	/**
	 * Perform the WebSocket handshake on a raw socket.
	 *
	 * @param {object} pRequest - The HTTP request object.
	 * @param {object} pSocket - The raw TCP socket.
	 * @param {Buffer} pHead - Initial data after the upgrade header.
	 * @returns {boolean} True if handshake succeeded.
	 */
	performHandshake(pRequest, pSocket, pHead)
	{
		let tmpKey = pRequest.headers['sec-websocket-key'];
		if (!tmpKey)
		{
			this.fable.log.error('WebSocket handshake failed: no Sec-WebSocket-Key header.');
			pSocket.destroy();
			return false;
		}

		let tmpAcceptKey = libCrypto.createHash('sha1')
			.update(tmpKey + WEBSOCKET_MAGIC_GUID)
			.digest('base64');

		let tmpResponse = [
			'HTTP/1.1 101 Switching Protocols',
			'Upgrade: websocket',
			'Connection: Upgrade',
			`Sec-WebSocket-Accept: ${tmpAcceptKey}`,
			'',
			''
		].join('\r\n');

		pSocket.write(tmpResponse);
		return true;
	}

	/**
	 * Parse a WebSocket frame from a buffer.
	 * Returns { opcode, payload, remainder } or null if incomplete.
	 *
	 * @param {Buffer} pBuffer - The buffer to parse.
	 * @returns {object|null} Parsed frame or null.
	 */
	parseFrame(pBuffer)
	{
		if (pBuffer.length < 2)
		{
			return null;
		}

		let tmpFirstByte = pBuffer[0];
		let tmpSecondByte = pBuffer[1];

		let tmpOpcode = tmpFirstByte & 0x0F;
		let tmpMasked = (tmpSecondByte & 0x80) !== 0;
		let tmpPayloadLength = tmpSecondByte & 0x7F;

		let tmpOffset = 2;

		if (tmpPayloadLength === 126)
		{
			if (pBuffer.length < 4)
			{
				return null;
			}
			tmpPayloadLength = pBuffer.readUInt16BE(2);
			tmpOffset = 4;
		}
		else if (tmpPayloadLength === 127)
		{
			if (pBuffer.length < 10)
			{
				return null;
			}
			// For simplicity, only handle 32-bit length (max 4GB)
			tmpPayloadLength = pBuffer.readUInt32BE(6);
			tmpOffset = 10;
		}

		let tmpMaskKey = null;
		if (tmpMasked)
		{
			if (pBuffer.length < tmpOffset + 4)
			{
				return null;
			}
			tmpMaskKey = pBuffer.slice(tmpOffset, tmpOffset + 4);
			tmpOffset += 4;
		}

		if (pBuffer.length < tmpOffset + tmpPayloadLength)
		{
			return null;
		}

		let tmpPayload = Buffer.alloc(tmpPayloadLength);
		pBuffer.copy(tmpPayload, 0, tmpOffset, tmpOffset + tmpPayloadLength);

		// Unmask the payload
		if (tmpMasked && tmpMaskKey)
		{
			for (let i = 0; i < tmpPayloadLength; i++)
			{
				tmpPayload[i] = tmpPayload[i] ^ tmpMaskKey[i % 4];
			}
		}

		let tmpRemainder = pBuffer.slice(tmpOffset + tmpPayloadLength);

		return {
			opcode: tmpOpcode,
			payload: tmpPayload,
			remainder: tmpRemainder
		};
	}

	/**
	 * Build a WebSocket frame for sending.
	 * Server frames are NOT masked.
	 *
	 * @param {Buffer|string} pPayload - The payload to send.
	 * @param {number} pOpcode - The frame opcode (1=text, 2=binary, 8=close, 9=ping, 10=pong).
	 * @returns {Buffer} The complete frame.
	 */
	buildFrame(pPayload, pOpcode)
	{
		let tmpPayload = Buffer.isBuffer(pPayload) ? pPayload : Buffer.from(pPayload, 'utf8');
		let tmpOpcode = (typeof(pOpcode) === 'number') ? pOpcode : 1; // Default to text frame

		let tmpHeaderLength;
		let tmpHeader;

		if (tmpPayload.length < 126)
		{
			tmpHeaderLength = 2;
			tmpHeader = Buffer.alloc(tmpHeaderLength);
			tmpHeader[0] = 0x80 | tmpOpcode; // FIN + opcode
			tmpHeader[1] = tmpPayload.length;
		}
		else if (tmpPayload.length < 65536)
		{
			tmpHeaderLength = 4;
			tmpHeader = Buffer.alloc(tmpHeaderLength);
			tmpHeader[0] = 0x80 | tmpOpcode;
			tmpHeader[1] = 126;
			tmpHeader.writeUInt16BE(tmpPayload.length, 2);
		}
		else
		{
			tmpHeaderLength = 10;
			tmpHeader = Buffer.alloc(tmpHeaderLength);
			tmpHeader[0] = 0x80 | tmpOpcode;
			tmpHeader[1] = 127;
			// Write as 64-bit (high 32 bits = 0 for reasonable sizes)
			tmpHeader.writeUInt32BE(0, 2);
			tmpHeader.writeUInt32BE(tmpPayload.length, 6);
		}

		return Buffer.concat([tmpHeader, tmpPayload]);
	}

	/**
	 * Send a JSON response over a WebSocket socket.
	 *
	 * @param {object} pSocket - The TCP socket.
	 * @param {object} pResponseObject - The response object to serialize.
	 */
	sendResponse(pSocket, pResponseObject)
	{
		try
		{
			let tmpJSON = JSON.stringify(pResponseObject);
			let tmpFrame = this.buildFrame(tmpJSON, 1);
			pSocket.write(tmpFrame);
		}
		catch (pError)
		{
			this.fable.log.error(`Error sending WebSocket response: ${pError.message}`, pError);
		}
	}

	/**
	 * Handle an incoming WebSocket connection.
	 * Sets up data buffering, frame parsing, and message dispatch.
	 *
	 * @param {object} pSocket - The TCP socket.
	 */
	handleConnection(pSocket)
	{
		let tmpBuffer = Buffer.alloc(0);

		pSocket.on('data',
			(pData) =>
			{
				tmpBuffer = Buffer.concat([tmpBuffer, pData]);

				let tmpFrame = this.parseFrame(tmpBuffer);
				while (tmpFrame)
				{
					tmpBuffer = tmpFrame.remainder;

					if (tmpFrame.opcode === 8)
					{
						// Close frame
						let tmpCloseFrame = this.buildFrame(Buffer.alloc(0), 8);
						pSocket.write(tmpCloseFrame);
						pSocket.end();
						return;
					}
					else if (tmpFrame.opcode === 9)
					{
						// Ping frame — respond with pong
						let tmpPongFrame = this.buildFrame(tmpFrame.payload, 10);
						pSocket.write(tmpPongFrame);
					}
					else if (tmpFrame.opcode === 1)
					{
						// Text frame — parse as JSON message
						try
						{
							let tmpMessage = JSON.parse(tmpFrame.payload.toString('utf8'));
							this.handleMessage(pSocket, tmpMessage);
						}
						catch (pError)
						{
							this.sendResponse(pSocket, { error: 'Invalid JSON message.', details: pError.message });
						}
					}
					else if (tmpFrame.opcode === 2)
					{
						// Binary frame — not supported in message protocol
						this.sendResponse(pSocket, { error: 'Binary frames not supported in message protocol. Send JSON text frames.' });
					}

					tmpFrame = this.parseFrame(tmpBuffer);
				}
			});

		pSocket.on('error',
			(pError) =>
			{
				this.fable.log.error(`WebSocket socket error: ${pError.message}`, pError);
			});

		pSocket.on('close',
			() =>
			{
				this.fable.log.info('WebSocket connection closed.');
			});
	}

	/**
	 * Dispatch a parsed JSON message to the appropriate lake operation.
	 *
	 * Message format:
	 * {
	 *   "action": "read"|"write"|"delete"|"exists"|"list",
	 *   "type": "record"|"binary",
	 *   "category": "...",
	 *   "hash": "...",
	 *   "data": { ... } (for write actions)
	 * }
	 *
	 * @param {object} pSocket - The TCP socket.
	 * @param {object} pMessage - The parsed message object.
	 */
	handleMessage(pSocket, pMessage)
	{
		if (!pMessage || (typeof(pMessage) !== 'object'))
		{
			return this.sendResponse(pSocket, { error: 'Message must be a JSON object.' });
		}

		let tmpAction = pMessage.action;
		let tmpType = pMessage.type;
		let tmpCategory = pMessage.category;
		let tmpHash = pMessage.hash;

		if (!tmpAction || (typeof(tmpAction) !== 'string'))
		{
			return this.sendResponse(pSocket, { error: 'Missing or invalid "action" field.' });
		}
		if (!tmpType || (typeof(tmpType) !== 'string'))
		{
			return this.sendResponse(pSocket, { error: 'Missing or invalid "type" field.' });
		}

		let tmpValidation = this.fable.ParimeLakeValidation;

		if (!tmpValidation.validateCategory(tmpCategory))
		{
			return this.sendResponse(pSocket, { error: 'Invalid category.', action: tmpAction, type: tmpType });
		}

		if (tmpAction === 'list')
		{
			return this.handleList(pSocket, pMessage);
		}

		if (!tmpValidation.validateHash(tmpHash))
		{
			return this.sendResponse(pSocket, { error: 'Invalid hash.', action: tmpAction, type: tmpType });
		}

		switch (tmpAction)
		{
			case 'read':
				return this.handleRead(pSocket, pMessage);
			case 'write':
				return this.handleWrite(pSocket, pMessage);
			case 'delete':
				return this.handleDelete(pSocket, pMessage);
			case 'exists':
				return this.handleExists(pSocket, pMessage);
			default:
				return this.sendResponse(pSocket, { error: `Unknown action: ${tmpAction}` });
		}
	}

	/**
	 * Ensure a Bibliograph source exists.
	 */
	ensureSource(pCategory, fCallback)
	{
		this.fable.Bibliograph.checkSourceExists(pCategory,
			(pError, pExists) =>
			{
				if (pError)
				{
					return fCallback(pError);
				}
				if (pExists)
				{
					return fCallback();
				}
				this.fable.Bibliograph.createSource(pCategory, fCallback);
			});
	}

	handleRead(pSocket, pMessage)
	{
		let tmpType = pMessage.type;
		let tmpCategory = pMessage.category;
		let tmpHash = pMessage.hash;

		if (tmpType === 'record')
		{
			this.ensureSource(tmpCategory,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'read', type: 'record' });
					}
					this.fable.Bibliograph.read(tmpCategory, tmpHash,
						(pError, pRecord) =>
						{
							if (pError)
							{
								return this.sendResponse(pSocket, { error: pError.message, action: 'read', type: 'record' });
							}
							this.sendResponse(pSocket, { action: 'read', type: 'record', category: tmpCategory, hash: tmpHash, data: pRecord || null });
						});
				});
		}
		else if (tmpType === 'binary')
		{
			this.fable.ParimeBinaryStorage.read(tmpCategory, tmpHash,
				(pError, pBuffer) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'read', type: 'binary' });
					}
					// Send binary data as base64-encoded string in JSON
					let tmpData = pBuffer ? pBuffer.toString('base64') : null;
					this.sendResponse(pSocket, { action: 'read', type: 'binary', category: tmpCategory, hash: tmpHash, data: tmpData, encoding: 'base64' });
				});
		}
		else
		{
			this.sendResponse(pSocket, { error: `Unknown type: ${tmpType}`, action: 'read' });
		}
	}

	handleWrite(pSocket, pMessage)
	{
		let tmpType = pMessage.type;
		let tmpCategory = pMessage.category;
		let tmpHash = pMessage.hash;
		let tmpData = pMessage.data;

		if (tmpType === 'record')
		{
			if (!tmpData || (typeof(tmpData) !== 'object'))
			{
				return this.sendResponse(pSocket, { error: 'Data must be a JSON object for record writes.', action: 'write', type: 'record' });
			}

			this.ensureSource(tmpCategory,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'write', type: 'record' });
					}
					this.fable.Bibliograph.write(tmpCategory, tmpHash, tmpData,
						(pError) =>
						{
							if (pError)
							{
								return this.sendResponse(pSocket, { error: pError.message, action: 'write', type: 'record' });
							}
							this.sendResponse(pSocket, { action: 'write', type: 'record', category: tmpCategory, hash: tmpHash, written: true });
						});
				});
		}
		else if (tmpType === 'binary')
		{
			// Expect data as base64 string
			if (!tmpData || (typeof(tmpData) !== 'string'))
			{
				return this.sendResponse(pSocket, { error: 'Data must be a base64-encoded string for binary writes.', action: 'write', type: 'binary' });
			}

			let tmpBuffer = Buffer.from(tmpData, 'base64');
			this.fable.ParimeBinaryStorage.write(tmpCategory, tmpHash, tmpBuffer,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'write', type: 'binary' });
					}
					this.sendResponse(pSocket, { action: 'write', type: 'binary', category: tmpCategory, hash: tmpHash, size: tmpBuffer.length, written: true });
				});
		}
		else
		{
			this.sendResponse(pSocket, { error: `Unknown type: ${tmpType}`, action: 'write' });
		}
	}

	handleDelete(pSocket, pMessage)
	{
		let tmpType = pMessage.type;
		let tmpCategory = pMessage.category;
		let tmpHash = pMessage.hash;

		if (tmpType === 'record')
		{
			this.ensureSource(tmpCategory,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'delete', type: 'record' });
					}
					this.fable.Bibliograph.delete(tmpCategory, tmpHash,
						(pError) =>
						{
							if (pError)
							{
								return this.sendResponse(pSocket, { error: pError.message, action: 'delete', type: 'record' });
							}
							this.sendResponse(pSocket, { action: 'delete', type: 'record', category: tmpCategory, hash: tmpHash, deleted: true });
						});
				});
		}
		else if (tmpType === 'binary')
		{
			this.fable.ParimeBinaryStorage.delete(tmpCategory, tmpHash,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'delete', type: 'binary' });
					}
					this.sendResponse(pSocket, { action: 'delete', type: 'binary', category: tmpCategory, hash: tmpHash, deleted: true });
				});
		}
		else
		{
			this.sendResponse(pSocket, { error: `Unknown type: ${tmpType}`, action: 'delete' });
		}
	}

	handleExists(pSocket, pMessage)
	{
		let tmpType = pMessage.type;
		let tmpCategory = pMessage.category;
		let tmpHash = pMessage.hash;

		if (tmpType === 'record')
		{
			this.ensureSource(tmpCategory,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'exists', type: 'record' });
					}
					this.fable.ParimeBibliographHelpers.exists(tmpCategory, tmpHash,
						(pError, pExists) =>
						{
							if (pError)
							{
								return this.sendResponse(pSocket, { error: pError.message, action: 'exists', type: 'record' });
							}
							this.sendResponse(pSocket, { action: 'exists', type: 'record', category: tmpCategory, hash: tmpHash, exists: !!pExists });
						});
				});
		}
		else if (tmpType === 'binary')
		{
			this.fable.ParimeBinaryStorage.exists(tmpCategory, tmpHash,
				(pError, pExists) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'exists', type: 'binary' });
					}
					this.sendResponse(pSocket, { action: 'exists', type: 'binary', category: tmpCategory, hash: tmpHash, exists: !!pExists });
				});
		}
		else
		{
			this.sendResponse(pSocket, { error: `Unknown type: ${tmpType}`, action: 'exists' });
		}
	}

	handleList(pSocket, pMessage)
	{
		let tmpType = pMessage.type;
		let tmpCategory = pMessage.category;

		if (tmpType === 'record')
		{
			this.ensureSource(tmpCategory,
				(pError) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'list', type: 'record' });
					}
					this.fable.ParimeBibliographHelpers.readRecordKeys(tmpCategory,
						(pError, pKeys) =>
						{
							if (pError)
							{
								return this.sendResponse(pSocket, { error: pError.message, action: 'list', type: 'record' });
							}
							this.sendResponse(pSocket, { action: 'list', type: 'record', category: tmpCategory, keys: pKeys || [] });
						});
				});
		}
		else if (tmpType === 'binary')
		{
			this.fable.ParimeBinaryStorage.listKeys(tmpCategory,
				(pError, pKeys) =>
				{
					if (pError)
					{
						return this.sendResponse(pSocket, { error: pError.message, action: 'list', type: 'binary' });
					}
					this.sendResponse(pSocket, { action: 'list', type: 'binary', category: tmpCategory, keys: pKeys || [] });
				});
		}
		else
		{
			this.sendResponse(pSocket, { error: `Unknown type: ${tmpType}`, action: 'list' });
		}
	}
}

module.exports = ParimeWebSocketHandler;
module.exports.default_options = _DefaultOptions;
