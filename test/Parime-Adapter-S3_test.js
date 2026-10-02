/**
 * Parime S3 adapter -- offline unit tests.
 *
 * These exercise the parts that need no network: required-configuration checks,
 * path-style object URL construction, and presigned-URL generation (SigV4 signing
 * is local). The live round-trip against MinIO / R2 lives in the gated
 * Parime-Adapter-S3-live_test.js.
 */
const libAssert = require('assert');
const libFable = require('fable');
const libAdapterS3 = require('../source/services/adapters/Parime-Adapter-S3.js');

function makeAdapter(pOptions)
{
	let tmpFable = new libFable({ Product: 'ParimeS3UnitTest', ProductVersion: '1.0.0' });
	return new libAdapterS3(tmpFable, pOptions || {}, 'ParimeS3UnitTest');
}

suite
(
	'Parime S3 Adapter (offline)',
	function ()
	{
		test('initialize fails clearly when required configuration is missing', function (fDone)
		{
			let tmpAdapter = makeAdapter({ Endpoint: 'https://acct.r2.cloudflarestorage.com' });
			tmpAdapter.initialize(
				(pError) =>
				{
					libAssert.ok(pError, 'expected a configuration error');
					libAssert.ok(pError.message.indexOf('Bucket') >= 0, 'should name the missing Bucket');
					libAssert.ok(pError.message.indexOf('AccessKeyId') >= 0, 'should name the missing AccessKeyId');
					libAssert.ok(pError.message.indexOf('SecretAccessKey') >= 0, 'should name the missing SecretAccessKey');
					fDone();
				});
		});

		test('builds a path-style object URL with the prefix, trimming and encoding', function ()
		{
			let tmpAdapter = makeAdapter(
				{
					Endpoint: 'https://acct.r2.cloudflarestorage.com/',
					Bucket: 'plansheet-media',
					Prefix: '/ns/',
					AccessKeyId: 'AK',
					SecretAccessKey: 'SK'
				});
			libAssert.strictEqual(
				tmpAdapter._objectURL('media-blobs/ab cd'),
				'https://acct.r2.cloudflarestorage.com/plansheet-media/ns/media-blobs/ab%20cd');
		});

		test('presignGet produces a signed, time-limited URL and never leaks the secret', function (fDone)
		{
			let tmpAdapter = makeAdapter(
				{
					Endpoint: 'https://acct.r2.cloudflarestorage.com',
					Bucket: 'plansheet-media',
					Region: 'auto',
					AccessKeyId: 'AKIAEXAMPLE',
					SecretAccessKey: 'thisisasecretkeythatmustnotleak'
				});
			tmpAdapter.presignGet('media-blobs/screenshot', { ExpiresInSeconds: 120, FileName: 'shot.png' },
				(pError, pURL) =>
				{
					libAssert.ok(!pError, 'presign failed: ' + (pError && pError.message));
					let tmpURL = new URL(pURL);
					libAssert.strictEqual(tmpURL.host, 'acct.r2.cloudflarestorage.com');
					libAssert.ok(tmpURL.pathname.indexOf('/plansheet-media/media-blobs/screenshot') === 0, 'path: ' + tmpURL.pathname);
					libAssert.ok(tmpURL.searchParams.has('X-Amz-Signature'), 'missing signature');
					libAssert.ok(tmpURL.searchParams.has('X-Amz-Credential'), 'missing credential');
					libAssert.strictEqual(tmpURL.searchParams.get('X-Amz-Expires'), '120');
					libAssert.ok(tmpURL.searchParams.has('response-content-disposition'), 'missing content-disposition');
					libAssert.strictEqual(pURL.indexOf('thisisasecretkeythatmustnotleak'), -1, 'the secret key must never appear in a presigned URL');
					fDone();
				});
		});

		test('advertises presign and stream capabilities', function ()
		{
			let tmpCaps = makeAdapter({}).capabilities();
			libAssert.strictEqual(tmpCaps.Presign, true);
			libAssert.strictEqual(tmpCaps.Stream, true);
		});
	}
);
