/**
 * Parime S3 adapter -- LIVE round-trip tests (gated).
 *
 * Skipped unless the S3_LIVE_* environment variables are set, so the normal suite
 * needs no network or credentials. Point it at a local MinIO or a real R2 bucket:
 *
 *   S3_LIVE_ENDPOINT=http://127.0.0.1:9000 \
 *   S3_LIVE_BUCKET=parime-itest \
 *   S3_LIVE_ACCESS_KEY=... S3_LIVE_SECRET=... S3_LIVE_REGION=us-east-1 \
 *   npx mocha -u tdd --exit test/Parime-Adapter-S3-live_test.js
 *
 * It proves the real wire end to end: put / head / get / stream / list / delete,
 * a presigned URL that a plain fetch (a browser) can download directly, and the
 * tiered store writing through to and reading back from the object store.
 */
const libAssert = require('assert');
const libFS = require('fs');
const libPath = require('path');
const libFable = require('fable');

const libAdapterS3 = require('../source/services/adapters/Parime-Adapter-S3.js');
const libTieredBinaryStorage = require('../source/services/Parime-TieredBinaryStorage.js');

const ENV = process.env;
const LIVE = !!(ENV.S3_LIVE_ENDPOINT && ENV.S3_LIVE_BUCKET && ENV.S3_LIVE_ACCESS_KEY && ENV.S3_LIVE_SECRET);
const RUN = 'itest-' + Date.now();
const TMP_CACHE = libPath.join(__dirname, 'tmp-s3-tiered-cache');

function s3Config()
{
	return (
		{
			Endpoint: ENV.S3_LIVE_ENDPOINT,
			Bucket: ENV.S3_LIVE_BUCKET,
			Region: ENV.S3_LIVE_REGION || 'auto',
			AccessKeyId: ENV.S3_LIVE_ACCESS_KEY,
			SecretAccessKey: ENV.S3_LIVE_SECRET
		});
}

suite
(
	'Parime S3 Adapter (live round-trip)',
	function ()
	{
		let _Adapter = null;

		suiteSetup
		(
			function (fDone)
			{
				if (!LIVE)
				{
					// No live target configured -- skip the whole suite.
					this.skip();
					return;
				}
				let tmpFable = new libFable({ Product: 'ParimeS3LiveTest', ProductVersion: '1.0.0' });
				_Adapter = new libAdapterS3(tmpFable, s3Config(), 'ParimeS3Live');
				_Adapter.initialize(fDone);
			}
		);

		suiteTeardown
		(
			function (fDone)
			{
				if (libFS.existsSync(TMP_CACHE)) { libFS.rmSync(TMP_CACHE, { recursive: true, force: true }); }
				if (!LIVE || !_Adapter) { return fDone(); }
				// Best-effort cleanup of anything this run created.
				_Adapter.list(`media-blobs/${RUN}/`,
					(pError, pKeys) =>
					{
						if (pError || !pKeys || !pKeys.length) { return fDone(); }
						let tmpIndex = 0;
						let fNext = () =>
						{
							if (tmpIndex >= pKeys.length) { return fDone(); }
							_Adapter.delete('media-blobs/' + pKeys[tmpIndex], () => { tmpIndex = tmpIndex + 1; fNext(); });
						};
						fNext();
					});
			}
		);

		test('put then head reports the object exists with the right size', function (fDone)
		{
			let tmpBytes = Buffer.from('live round trip payload');
			let tmpKey = `media-blobs/${RUN}/a`;
			_Adapter.put(tmpKey, tmpBytes, { ContentType: 'text/plain' },
				(pPutError) =>
				{
					libAssert.ok(!pPutError, 'put failed: ' + (pPutError && pPutError.message));
					_Adapter.head(tmpKey,
						(pHeadError, pHead) =>
						{
							libAssert.ok(!pHeadError);
							libAssert.strictEqual(pHead.Exists, true);
							libAssert.strictEqual(pHead.Size, tmpBytes.length);
							fDone();
						});
				});
		});

		test('get returns the exact bytes', function (fDone)
		{
			_Adapter.get(`media-blobs/${RUN}/a`,
				(pError, pBuffer) =>
				{
					libAssert.ok(!pError);
					libAssert.strictEqual(pBuffer.toString(), 'live round trip payload');
					fDone();
				});
		});

		test('getStream returns the exact bytes', function (fDone)
		{
			_Adapter.getStream(`media-blobs/${RUN}/a`, {},
				(pError, pStream) =>
				{
					libAssert.ok(!pError);
					libAssert.ok(pStream, 'no stream');
					let tmpChunks = [];
					pStream.on('data', (pChunk) => tmpChunks.push(pChunk));
					pStream.on('end', () => { libAssert.strictEqual(Buffer.concat(tmpChunks).toString(), 'live round trip payload'); fDone(); });
					pStream.on('error', fDone);
				});
		});

		test('list includes the object under its prefix', function (fDone)
		{
			_Adapter.list(`media-blobs/${RUN}/`,
				(pError, pKeys) =>
				{
					libAssert.ok(!pError);
					libAssert.ok(pKeys.indexOf(`${RUN}/a`) >= 0, 'listed keys: ' + JSON.stringify(pKeys));
					fDone();
				});
		});

		test('a presigned URL downloads directly over plain fetch (browser-direct path)', function (fDone)
		{
			_Adapter.presignGet(`media-blobs/${RUN}/a`, { ExpiresInSeconds: 120 },
				(pError, pURL) =>
				{
					libAssert.ok(!pError);
					libAssert.ok(pURL, 'no presigned url');
					// A plain fetch with NO credentials -- exactly what a browser does.
					fetch(pURL)
						.then((pResponse) =>
						{
							libAssert.strictEqual(pResponse.ok, true, 'presigned fetch status ' + pResponse.status);
							return pResponse.text();
						})
						.then((pText) => { libAssert.strictEqual(pText, 'live round trip payload'); fDone(); })
						.catch(fDone);
				});
		});

		test('delete removes the object', function (fDone)
		{
			let tmpKey = `media-blobs/${RUN}/a`;
			_Adapter.delete(tmpKey,
				(pError) =>
				{
					libAssert.ok(!pError);
					_Adapter.head(tmpKey,
						(pHeadError, pHead) =>
						{
							libAssert.ok(!pHeadError);
							libAssert.strictEqual(pHead.Exists, false);
							fDone();
						});
				});
		});

		test('the tiered store writes through to the object store and reads it back', function (fDone)
		{
			if (libFS.existsSync(TMP_CACHE)) { libFS.rmSync(TMP_CACHE, { recursive: true, force: true }); }
			let tmpFable = new libFable(
				{
					Product: 'ParimeS3TieredLive',
					ProductVersion: '1.0.0',
					ParimeBinaryStorageRoot: TMP_CACHE,
					ParimeDurableBackend: { Type: 's3', WriteMode: 'write-through', S3: s3Config() }
				});
			tmpFable.addServiceType('ParimeTieredBinaryStorage', libTieredBinaryStorage);
			let tmpTiered = tmpFable.instantiateServiceProvider('ParimeTieredBinaryStorage');
			tmpTiered.initialize(
				(pInitError) =>
				{
					libAssert.ok(!pInitError, 'tiered init failed: ' + (pInitError && pInitError.message));
					let tmpBytes = Buffer.from('tiered over s3 payload');
					tmpTiered.write('media-blobs', `${RUN}/tiered`, tmpBytes,
						(pWriteError) =>
						{
							libAssert.ok(!pWriteError, 'tiered write failed: ' + (pWriteError && pWriteError.message));
							// The durable object store now has it (write-through).
							_Adapter.head(`media-blobs/${RUN}/tiered`,
								(pHeadError, pHead) =>
								{
									libAssert.ok(!pHeadError);
									libAssert.strictEqual(pHead.Exists, true, 'write-through did not reach the object store');
									// Read-through from a cold cache: wipe the local cache first.
									libFS.rmSync(TMP_CACHE, { recursive: true, force: true });
									tmpTiered.read('media-blobs', `${RUN}/tiered`,
										(pReadError, pBuffer) =>
										{
											libAssert.ok(!pReadError);
											libAssert.strictEqual(pBuffer.toString(), 'tiered over s3 payload');
											_Adapter.delete(`media-blobs/${RUN}/tiered`, () => fDone());
										});
								});
						});
				});
		});
	}
);
