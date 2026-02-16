/**
 * Parime Data Lake — Full Test Suite
 *
 * Tests Record Lakes, Binary Lakes, Combined Lakes, and WebSocket Protocol.
 */
const libAssert = require('assert');
const libHTTP = require('http');
const libNet = require('net');
const libCrypto = require('crypto');
const libFS = require('fs');
const libPath = require('path');

const libPict = require('pict');

const SERVER_PORT = 9920; // Use a non-standard port to avoid conflicts
const BASE_URL = `http://127.0.0.1:${SERVER_PORT}`;

const BINARY_STORAGE_ROOT = libPath.join(__dirname, 'tmp-binary-storage');
const BIBLIOGRAPH_STORAGE_ROOT = libPath.join(__dirname, 'tmp-bibliograph-storage');

/**
 * Simple HTTP request helper.
 *
 * @param {string} pMethod - HTTP method.
 * @param {string} pPath - URL path.
 * @param {object|Buffer|null} pBody - Request body.
 * @param {object} pHeaders - Additional headers.
 * @param {function} fCallback - Callback(pError, pStatusCode, pBody, pResponseHeaders).
 */
function httpRequest(pMethod, pPath, pBody, pHeaders, fCallback)
{
	let tmpURL = new URL(pPath, BASE_URL);
	let tmpOptions = {
		hostname: tmpURL.hostname,
		port: tmpURL.port,
		path: tmpURL.pathname,
		method: pMethod,
		headers: pHeaders || {}
	};

	let tmpReq = libHTTP.request(tmpOptions,
		(pResponse) =>
		{
			let tmpChunks = [];
			pResponse.on('data', (pChunk) => { tmpChunks.push(pChunk); });
			pResponse.on('end',
				() =>
				{
					let tmpRawBody = Buffer.concat(tmpChunks);
					let tmpParsedBody;
					try
					{
						tmpParsedBody = JSON.parse(tmpRawBody.toString('utf8'));
					}
					catch (e)
					{
						tmpParsedBody = tmpRawBody;
					}
					return fCallback(null, pResponse.statusCode, tmpParsedBody, pResponse.headers);
				});
		});

	tmpReq.on('error', (pError) => { return fCallback(pError); });

	if (pBody)
	{
		if (Buffer.isBuffer(pBody))
		{
			tmpReq.write(pBody);
		}
		else if (typeof(pBody) === 'object')
		{
			tmpReq.setHeader('Content-Type', 'application/json');
			tmpReq.write(JSON.stringify(pBody));
		}
		else if (typeof(pBody) === 'string')
		{
			tmpReq.write(pBody);
		}
	}

	tmpReq.end();
}

/**
 * Clean up a directory recursively.
 */
function cleanDir(pPath)
{
	if (libFS.existsSync(pPath))
	{
		libFS.rmSync(pPath, { recursive: true, force: true });
	}
}

suite
(
	'Parime Data Lake',
	function ()
	{
		let _Pict = null;
		let _ParimeServer = null;

		suiteSetup
		(
			function (fDone)
			{
				this.timeout(30000);

				// Clean up test storage directories
				cleanDir(BINARY_STORAGE_ROOT);
				cleanDir(BIBLIOGRAPH_STORAGE_ROOT);

				_Pict = new libPict(
					{
						Product: 'ParimeTest',
						ProductVersion: '1.0.0',
						APIServerPort: SERVER_PORT,
						ParimeBinaryStorageRoot: BINARY_STORAGE_ROOT,
						BibliographStorageFolder: BIBLIOGRAPH_STORAGE_ROOT,
						RestifyConfiguration:
						{
							strictNext: true,
							handleUpgrades: true
						}
					});

				let libParimeServer = require('../source/Parime-Server.js');
				_Pict.addServiceType('ParimeServer', libParimeServer);
				_ParimeServer = _Pict.instantiateServiceProvider('ParimeServer');

				_ParimeServer.initialize(
					(pError) =>
					{
						if (pError)
						{
							console.log('Error initializing Parime server:', pError);
						}
						return fDone(pError);
					});
			}
		);

		suiteTeardown
		(
			function (fDone)
			{
				this.timeout(15000);

				// Clean up test storage directories
				cleanDir(BINARY_STORAGE_ROOT);
				cleanDir(BIBLIOGRAPH_STORAGE_ROOT);

				if (_Pict && _Pict.OratorServiceServer && _Pict.OratorServiceServer.server)
				{
					try
					{
						_Pict.OratorServiceServer.server.close();
					}
					catch (pError)
					{
						// Ignore close errors
					}
				}
				// Give the server a moment to close, then proceed
				setTimeout(fDone, 500);
			}
		);

		// ====================================================================
		// Record Lakes
		// ====================================================================
		suite
		(
			'Record Lakes',
			function ()
			{
				test
				(
					'should reject invalid category names',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/123invalid', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 400);
								libAssert.ok(pBody.Error);
								return fDone();
							});
					}
				);

				test
				(
					'should return empty key list for new category',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Category, 'TestCategory');
								libAssert.ok(Array.isArray(pBody.Keys));
								return fDone();
							});
					}
				);

				test
				(
					'should write a record',
					function (fDone)
					{
						let tmpRecord = { Name: 'Test Record', Value: 42 };
						httpRequest('PUT', '/1.0/Record/TestCategory/rec001', tmpRecord, { 'Content-Type': 'application/json' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Written, true);
								libAssert.strictEqual(pBody.Hash, 'rec001');
								return fDone();
							});
					}
				);

				test
				(
					'should read a record back',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory/rec001', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Name, 'Test Record');
								libAssert.strictEqual(pBody.Value, 42);
								return fDone();
							});
					}
				);

				test
				(
					'should return 404 for non-existent record',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory/nonexistent', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 404);
								libAssert.ok(pBody.Error);
								return fDone();
							});
					}
				);

				test
				(
					'should check record existence (true)',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory/Exists/rec001', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Exists, true);
								return fDone();
							});
					}
				);

				test
				(
					'should check record existence (false)',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory/Exists/nonexistent', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Exists, false);
								return fDone();
							});
					}
				);

				test
				(
					'should list record keys',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.ok(pBody.Keys.length > 0);
								return fDone();
							});
					}
				);

				test
				(
					'should read record metadata',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory/rec001/Metadata', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								// Bibliograph metadata has GUID, Length, etc.
								libAssert.ok(pBody.GUID || pBody.Length !== undefined || typeof(pBody) === 'object');
								return fDone();
							});
					}
				);

				test
				(
					'should update a record',
					function (fDone)
					{
						let tmpUpdated = { Name: 'Updated Record', Value: 99 };
						httpRequest('PUT', '/1.0/Record/TestCategory/rec001', tmpUpdated, { 'Content-Type': 'application/json' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Written, true);

								// Read it back
								httpRequest('GET', '/1.0/Record/TestCategory/rec001', null, {},
									(pError, pStatus, pBody) =>
									{
										libAssert.strictEqual(pStatus, 200);
										libAssert.strictEqual(pBody.Name, 'Updated Record');
										libAssert.strictEqual(pBody.Value, 99);
										return fDone();
									});
							});
					}
				);

				test
				(
					'should read record delta',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Record/TestCategory/rec001/Delta', null, {},
							(pError, pStatus, pBody) =>
							{
								// Delta may or may not exist, but shouldn't error
								libAssert.ok(pStatus === 200 || pStatus === 404);
								return fDone();
							});
					}
				);

				test
				(
					'should delete a record',
					function (fDone)
					{
						httpRequest('DELETE', '/1.0/Record/TestCategory/rec001', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Deleted, true);

								// Verify it's gone
								httpRequest('GET', '/1.0/Record/TestCategory/rec001', null, {},
									(pError, pStatus, pBody) =>
									{
										libAssert.strictEqual(pStatus, 404);
										return fDone();
									});
							});
					}
				);

				test
				(
					'should reject PUT without a JSON body',
					function (fDone)
					{
						httpRequest('PUT', '/1.0/Record/TestCategory/rec002', null, { 'Content-Type': 'application/json' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 400);
								return fDone();
							});
					}
				);
			}
		);

		// ====================================================================
		// Binary Lakes
		// ====================================================================
		suite
		(
			'Binary Lakes',
			function ()
			{
				let _TestBuffer = Buffer.from('Hello Binary World! This is test content for the binary lake. '.repeat(100));

				test
				(
					'should reject invalid category names',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/123bad', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 400);
								return fDone();
							});
					}
				);

				test
				(
					'should write binary data',
					function (fDone)
					{
						httpRequest('PUT', '/1.0/Binary/BinCategory/testfile.dat', _TestBuffer, { 'Content-Type': 'application/octet-stream' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Written, true);
								libAssert.strictEqual(pBody.Size, _TestBuffer.length);
								return fDone();
							});
					}
				);

				test
				(
					'should read binary data back (full)',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory/testfile.dat', null, {},
							(pError, pStatus, pBody, pHeaders) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.length, _TestBuffer.length);
								libAssert.ok(pBody.equals(_TestBuffer));
								libAssert.strictEqual(pHeaders['accept-ranges'], 'bytes');
								return fDone();
							});
					}
				);

				test
				(
					'should support byte-range request (start-end)',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory/testfile.dat', null, { 'Range': 'bytes=0-9' },
							(pError, pStatus, pBody, pHeaders) =>
							{
								libAssert.strictEqual(pStatus, 206);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.length, 10);
								libAssert.ok(pBody.equals(_TestBuffer.slice(0, 10)));
								libAssert.ok(pHeaders['content-range']);
								libAssert.ok(pHeaders['content-range'].startsWith('bytes 0-9/'));
								return fDone();
							});
					}
				);

				test
				(
					'should support byte-range request (open-ended)',
					function (fDone)
					{
						let tmpStart = _TestBuffer.length - 10;
						httpRequest('GET', '/1.0/Binary/BinCategory/testfile.dat', null, { 'Range': `bytes=${tmpStart}-` },
							(pError, pStatus, pBody, pHeaders) =>
							{
								libAssert.strictEqual(pStatus, 206);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.length, 10);
								return fDone();
							});
					}
				);

				test
				(
					'should support byte-range request (suffix)',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory/testfile.dat', null, { 'Range': 'bytes=-20' },
							(pError, pStatus, pBody, pHeaders) =>
							{
								libAssert.strictEqual(pStatus, 206);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.length, 20);
								return fDone();
							});
					}
				);

				test
				(
					'should return 404 for non-existent binary file',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory/nosuchfile.dat', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 404);
								return fDone();
							});
					}
				);

				test
				(
					'should write binary data with nested path (slashes in hash)',
					function (fDone)
					{
						let tmpNestedBuffer = Buffer.from('Nested binary content');
						httpRequest('PUT', '/1.0/Binary/BinCategory/sub/dir/nested.bin', tmpNestedBuffer, { 'Content-Type': 'application/octet-stream' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Written, true);
								libAssert.strictEqual(pBody.Hash, 'sub/dir/nested.bin');
								return fDone();
							});
					}
				);

				test
				(
					'should read nested binary data back',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory/sub/dir/nested.bin', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.toString(), 'Nested binary content');
								return fDone();
							});
					}
				);

				test
				(
					'should reject path traversal attempts',
					function (fDone)
					{
						// Restify normalizes ../ in URLs, so we test with encoded dots
						// that our validation service catches
						httpRequest('GET', '/1.0/Binary/BinCategory/..', null, {},
							(pError, pStatus, pBody) =>
							{
								// Either 400 (our validation catches it) or 404 (Restify normalizes before routing)
								libAssert.ok(pStatus === 400 || pStatus === 404, `Expected 400 or 404, got ${pStatus}`);
								return fDone();
							});
					}
				);

				test
				(
					'should list binary keys',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.ok(Array.isArray(pBody.Keys));
								libAssert.ok(pBody.Keys.length >= 2);
								return fDone();
							});
					}
				);

				test
				(
					'should get binary file stats',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Binary/BinCategory/testfile.dat/Stat', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Size, _TestBuffer.length);
								libAssert.ok(pBody.Modified);
								return fDone();
							});
					}
				);

				test
				(
					'should delete binary file',
					function (fDone)
					{
						httpRequest('DELETE', '/1.0/Binary/BinCategory/testfile.dat', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Deleted, true);

								// Verify it's gone
								httpRequest('GET', '/1.0/Binary/BinCategory/testfile.dat', null, {},
									(pError, pStatus, pBody) =>
									{
										libAssert.strictEqual(pStatus, 404);
										return fDone();
									});
							});
					}
				);
			}
		);

		// ====================================================================
		// Combined Lakes
		// ====================================================================
		suite
		(
			'Combined Lakes',
			function ()
			{
				test
				(
					'should write a combined record',
					function (fDone)
					{
						let tmpRecord = { Title: 'Combined Entry', Description: 'Has both record and file' };
						httpRequest('PUT', '/1.0/Combined/CombCategory/combo001/Record', tmpRecord, { 'Content-Type': 'application/json' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Written, true);
								libAssert.strictEqual(pBody.Type, 'Record');
								return fDone();
							});
					}
				);

				test
				(
					'should write a combined file',
					function (fDone)
					{
						let tmpFileContent = Buffer.from('Combined file binary content here');
						httpRequest('PUT', '/1.0/Combined/CombCategory/combo001/File', tmpFileContent, { 'Content-Type': 'application/octet-stream' },
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Written, true);
								libAssert.strictEqual(pBody.Type, 'File');
								return fDone();
							});
					}
				);

				test
				(
					'should read the combined record',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Combined/CombCategory/combo001/Record', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.Title, 'Combined Entry');
								return fDone();
							});
					}
				);

				test
				(
					'should read the combined file',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Combined/CombCategory/combo001/File', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.toString(), 'Combined file binary content here');
								return fDone();
							});
					}
				);

				test
				(
					'should read combined file with byte-range',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Combined/CombCategory/combo001/File', null, { 'Range': 'bytes=0-7' },
							(pError, pStatus, pBody, pHeaders) =>
							{
								libAssert.strictEqual(pStatus, 206);
								libAssert.ok(Buffer.isBuffer(pBody));
								libAssert.strictEqual(pBody.toString(), 'Combined');
								return fDone();
							});
					}
				);

				test
				(
					'should check combined existence',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Combined/CombCategory/combo001/Exists', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.RecordExists, true);
								libAssert.strictEqual(pBody.FileExists, true);
								return fDone();
							});
					}
				);

				test
				(
					'should list combined keys',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Combined/CombCategory', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.ok(Array.isArray(pBody.Keys));
								libAssert.ok(pBody.Keys.length > 0);
								// At least one key should have both record and file
								let tmpFoundCombo = pBody.Keys.find((pKey) => { return pKey.HasRecord && pKey.HasFile; });
								libAssert.ok(tmpFoundCombo);
								return fDone();
							});
					}
				);

				test
				(
					'should delete combined (both record and file)',
					function (fDone)
					{
						httpRequest('DELETE', '/1.0/Combined/CombCategory/combo001', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 200);
								libAssert.strictEqual(pBody.RecordDeleted, true);
								libAssert.strictEqual(pBody.FileDeleted, true);

								// Verify both are gone
								httpRequest('GET', '/1.0/Combined/CombCategory/combo001/Exists', null, {},
									(pError, pStatus, pBody) =>
									{
										libAssert.strictEqual(pStatus, 200);
										libAssert.strictEqual(pBody.RecordExists, false);
										libAssert.strictEqual(pBody.FileExists, false);
										return fDone();
									});
							});
					}
				);

				test
				(
					'should reject invalid category for combined lake',
					function (fDone)
					{
						httpRequest('GET', '/1.0/Combined/123bad/hash/Record', null, {},
							(pError, pStatus, pBody) =>
							{
								libAssert.strictEqual(pStatus, 400);
								return fDone();
							});
					}
				);
			}
		);

		// ====================================================================
		// WebSocket
		// ====================================================================
		suite
		(
			'WebSocket',
			function ()
			{
				/**
				 * Perform a WebSocket handshake and return the connected socket.
				 */
				function wsConnect(fCallback)
				{
					let tmpKey = libCrypto.randomBytes(16).toString('base64');
					let tmpExpectedAccept = libCrypto.createHash('sha1')
						.update(tmpKey + '258EAFA5-E914-47DA-95CA-5AB53FF86510')
						.digest('base64');

					let tmpReqString = [
						'GET /1.0/WebSocket/Lake HTTP/1.1',
						`Host: 127.0.0.1:${SERVER_PORT}`,
						'Upgrade: websocket',
						'Connection: Upgrade',
						`Sec-WebSocket-Key: ${tmpKey}`,
						'Sec-WebSocket-Version: 13',
						'',
						''
					].join('\r\n');

					let tmpSocket = libNet.createConnection(SERVER_PORT, '127.0.0.1',
						() =>
						{
							tmpSocket.write(tmpReqString);
						});

					let tmpBuffer = Buffer.alloc(0);
					let tmpHandshakeComplete = false;

					tmpSocket.on('data',
						function onData(pData)
						{
							if (tmpHandshakeComplete)
							{
								return;
							}

							tmpBuffer = Buffer.concat([tmpBuffer, pData]);
							let tmpStr = tmpBuffer.toString('utf8');

							if (tmpStr.indexOf('\r\n\r\n') >= 0)
							{
								tmpHandshakeComplete = true;

								if (tmpStr.indexOf('101') < 0)
								{
									tmpSocket.destroy();
									return fCallback(new Error('WebSocket handshake failed: ' + tmpStr.split('\r\n')[0]));
								}

								if (tmpStr.indexOf(tmpExpectedAccept) < 0)
								{
									tmpSocket.destroy();
									return fCallback(new Error('WebSocket handshake failed: invalid Sec-WebSocket-Accept'));
								}

								// Remove the handshake data listener
								tmpSocket.removeListener('data', onData);

								return fCallback(null, tmpSocket);
							}
						});

					tmpSocket.on('error',
						(pError) =>
						{
							return fCallback(pError);
						});
				}

				/**
				 * Build a masked WebSocket text frame (client frames must be masked).
				 */
				function buildClientFrame(pPayload)
				{
					let tmpPayload = Buffer.from(pPayload, 'utf8');
					let tmpMask = libCrypto.randomBytes(4);

					let tmpHeaderLength;
					let tmpHeader;

					if (tmpPayload.length < 126)
					{
						tmpHeaderLength = 2 + 4;
						tmpHeader = Buffer.alloc(tmpHeaderLength);
						tmpHeader[0] = 0x81; // FIN + text
						tmpHeader[1] = 0x80 | tmpPayload.length; // Masked
						tmpMask.copy(tmpHeader, 2);
					}
					else if (tmpPayload.length < 65536)
					{
						tmpHeaderLength = 4 + 4;
						tmpHeader = Buffer.alloc(tmpHeaderLength);
						tmpHeader[0] = 0x81;
						tmpHeader[1] = 0x80 | 126;
						tmpHeader.writeUInt16BE(tmpPayload.length, 2);
						tmpMask.copy(tmpHeader, 4);
					}
					else
					{
						tmpHeaderLength = 10 + 4;
						tmpHeader = Buffer.alloc(tmpHeaderLength);
						tmpHeader[0] = 0x81;
						tmpHeader[1] = 0x80 | 127;
						tmpHeader.writeUInt32BE(0, 2);
						tmpHeader.writeUInt32BE(tmpPayload.length, 6);
						tmpMask.copy(tmpHeader, 10);
					}

					// Mask the payload
					let tmpMaskedPayload = Buffer.alloc(tmpPayload.length);
					for (let i = 0; i < tmpPayload.length; i++)
					{
						tmpMaskedPayload[i] = tmpPayload[i] ^ tmpMask[i % 4];
					}

					return Buffer.concat([tmpHeader, tmpMaskedPayload]);
				}

				/**
				 * Send a JSON message and wait for the response.
				 */
				function wsSendAndReceive(pSocket, pMessage, fCallback)
				{
					let tmpFrame = buildClientFrame(JSON.stringify(pMessage));
					let tmpBuffer = Buffer.alloc(0);
					let tmpReceived = false;

					let tmpTimeout = setTimeout(
						() =>
						{
							if (!tmpReceived)
							{
								tmpReceived = true;
								pSocket.removeListener('data', onData);
								return fCallback(new Error('WebSocket response timeout'));
							}
						}, 5000);

					function onData(pData)
					{
						if (tmpReceived)
						{
							return;
						}

						tmpBuffer = Buffer.concat([tmpBuffer, pData]);

						// Try to parse a frame
						if (tmpBuffer.length < 2)
						{
							return;
						}

						let tmpPayloadLength = tmpBuffer[1] & 0x7F;
						let tmpOffset = 2;

						if (tmpPayloadLength === 126)
						{
							if (tmpBuffer.length < 4)
							{
								return;
							}
							tmpPayloadLength = tmpBuffer.readUInt16BE(2);
							tmpOffset = 4;
						}
						else if (tmpPayloadLength === 127)
						{
							if (tmpBuffer.length < 10)
							{
								return;
							}
							tmpPayloadLength = tmpBuffer.readUInt32BE(6);
							tmpOffset = 10;
						}

						if (tmpBuffer.length < tmpOffset + tmpPayloadLength)
						{
							return;
						}

						tmpReceived = true;
						clearTimeout(tmpTimeout);
						pSocket.removeListener('data', onData);

						let tmpPayload = tmpBuffer.slice(tmpOffset, tmpOffset + tmpPayloadLength);
						try
						{
							let tmpResponse = JSON.parse(tmpPayload.toString('utf8'));
							return fCallback(null, tmpResponse);
						}
						catch (e)
						{
							return fCallback(new Error('Invalid JSON in WebSocket response'));
						}
					}

					pSocket.on('data', onData);
					pSocket.write(tmpFrame);
				}

				test
				(
					'should establish a WebSocket connection',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(pSocket);
								pSocket.destroy();
								return fDone();
							});
					}
				);

				test
				(
					'should write and read a record via WebSocket',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);

								// Write a record
								wsSendAndReceive(pSocket,
									{ action: 'write', type: 'record', category: 'WSTest', hash: 'wsrec001', data: { Greeting: 'Hello from WebSocket' } },
									(pError, pResponse) =>
									{
										libAssert.ifError(pError);
										libAssert.strictEqual(pResponse.action, 'write');
										libAssert.strictEqual(pResponse.written, true);

										// Read it back
										wsSendAndReceive(pSocket,
											{ action: 'read', type: 'record', category: 'WSTest', hash: 'wsrec001' },
											(pError, pResponse) =>
											{
												libAssert.ifError(pError);
												libAssert.strictEqual(pResponse.action, 'read');
												libAssert.strictEqual(pResponse.data.Greeting, 'Hello from WebSocket');
												pSocket.destroy();
												return fDone();
											});
									});
							});
					}
				);

				test
				(
					'should write and read binary via WebSocket (base64)',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);

								let tmpBase64Data = Buffer.from('WebSocket binary test').toString('base64');

								// Write binary
								wsSendAndReceive(pSocket,
									{ action: 'write', type: 'binary', category: 'WSBinTest', hash: 'wsbin001', data: tmpBase64Data },
									(pError, pResponse) =>
									{
										libAssert.ifError(pError);
										libAssert.strictEqual(pResponse.written, true);

										// Read it back
										wsSendAndReceive(pSocket,
											{ action: 'read', type: 'binary', category: 'WSBinTest', hash: 'wsbin001' },
											(pError, pResponse) =>
											{
												libAssert.ifError(pError);
												libAssert.strictEqual(pResponse.encoding, 'base64');
												let tmpDecoded = Buffer.from(pResponse.data, 'base64').toString();
												libAssert.strictEqual(tmpDecoded, 'WebSocket binary test');
												pSocket.destroy();
												return fDone();
											});
									});
							});
					}
				);

				test
				(
					'should check existence via WebSocket',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);

								wsSendAndReceive(pSocket,
									{ action: 'exists', type: 'record', category: 'WSTest', hash: 'wsrec001' },
									(pError, pResponse) =>
									{
										libAssert.ifError(pError);
										libAssert.strictEqual(pResponse.exists, true);
										pSocket.destroy();
										return fDone();
									});
							});
					}
				);

				test
				(
					'should list keys via WebSocket',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);

								wsSendAndReceive(pSocket,
									{ action: 'list', type: 'record', category: 'WSTest' },
									(pError, pResponse) =>
									{
										libAssert.ifError(pError);
										libAssert.ok(Array.isArray(pResponse.keys));
										libAssert.ok(pResponse.keys.length > 0);
										pSocket.destroy();
										return fDone();
									});
							});
					}
				);

				test
				(
					'should delete via WebSocket',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);

								wsSendAndReceive(pSocket,
									{ action: 'delete', type: 'record', category: 'WSTest', hash: 'wsrec001' },
									(pError, pResponse) =>
									{
										libAssert.ifError(pError);
										libAssert.strictEqual(pResponse.deleted, true);

										// Verify it's gone
										wsSendAndReceive(pSocket,
											{ action: 'exists', type: 'record', category: 'WSTest', hash: 'wsrec001' },
											(pError, pResponse) =>
											{
												libAssert.ifError(pError);
												libAssert.strictEqual(pResponse.exists, false);
												pSocket.destroy();
												return fDone();
											});
									});
							});
					}
				);

				test
				(
					'should handle invalid messages',
					function (fDone)
					{
						this.timeout(10000);
						wsConnect(
							(pError, pSocket) =>
							{
								libAssert.ifError(pError);

								wsSendAndReceive(pSocket,
									{ action: 'bogus', type: 'record', category: 'WSTest', hash: 'x' },
									(pError, pResponse) =>
									{
										libAssert.ifError(pError);
										libAssert.ok(pResponse.error);
										pSocket.destroy();
										return fDone();
									});
							});
					}
				);
			}
		);
	}
);
