/**
 * Parime-Storage backend selection.
 *
 * The headless ParimeStorage entry point registers fable.ParimeBinaryStorage as the
 * TIERED store (local cache over a durable backend) when ParimeDurableBackend is
 * configured, and the plain local store otherwise -- under the same service name, so
 * every consumer is unchanged. These tests pin that selection both ways.
 */
const libAssert = require('assert');
const libFS = require('fs');
const libPath = require('path');
const libFable = require('fable');

const libParimeStorage = require('../source/Parime-Storage.js');

const TMP = libPath.join(__dirname, 'tmp-storage-selection');

function cleanDir(pPath)
{
	if (libFS.existsSync(pPath)) { libFS.rmSync(pPath, { recursive: true, force: true }); }
}

suite
(
	'Parime-Storage backend selection',
	function ()
	{
		suiteTeardown(function () { cleanDir(TMP); });

		test('with no ParimeDurableBackend, ParimeBinaryStorage is the plain local store', function (fDone)
		{
			let tmpCache = libPath.join(TMP, 'plain-cache');
			cleanDir(tmpCache);
			let tmpFable = new libFable({ Product: 'ParimeSelPlain', ProductVersion: '1.0.0', ParimeBinaryStorageRoot: tmpCache });
			tmpFable.addServiceType('ParimeStorage', libParimeStorage);
			tmpFable.instantiateServiceProvider('ParimeStorage');
			tmpFable.ParimeStorage.initialize(
				(pError) =>
				{
					libAssert.ok(!pError, 'init failed: ' + (pError && pError.message));
					libAssert.strictEqual(tmpFable.ParimeBinaryStorage.serviceType, 'ParimeBinaryStorage');
					libAssert.strictEqual(typeof tmpFable.ParimeBinaryStorage.capabilities, 'undefined', 'plain store should have no capabilities()');
					fDone();
				});
		});

		test('with a durable backend configured, ParimeBinaryStorage is the tiered store and round-trips', function (fDone)
		{
			let tmpCache = libPath.join(TMP, 'tiered-cache');
			let tmpDurable = libPath.join(TMP, 'tiered-durable');
			cleanDir(tmpCache); cleanDir(tmpDurable);
			let tmpFable = new libFable(
				{
					Product: 'ParimeSelTiered',
					ProductVersion: '1.0.0',
					ParimeBinaryStorageRoot: tmpCache,
					ParimeDurableBackend: { Type: 'filesystem', WriteMode: 'write-through', Filesystem: { Root: tmpDurable } }
				});
			tmpFable.addServiceType('ParimeStorage', libParimeStorage);
			tmpFable.instantiateServiceProvider('ParimeStorage');
			tmpFable.ParimeStorage.initialize(
				(pError) =>
				{
					libAssert.ok(!pError, 'init failed: ' + (pError && pError.message));
					libAssert.strictEqual(tmpFable.ParimeBinaryStorage.serviceType, 'ParimeTieredBinaryStorage');
					libAssert.strictEqual(tmpFable.ParimeBinaryStorage.capabilities().Durable, true);
					// A write lands in the durable tier too (proving it is really tiered).
					tmpFable.ParimeBinaryStorage.write('media-blobs', 'sel-1', Buffer.from('selected tiered'),
						(pWriteError) =>
						{
							libAssert.ok(!pWriteError);
							libAssert.ok(libFS.existsSync(libPath.join(tmpDurable, 'media-blobs', 'sel-1')), 'durable copy missing');
							tmpFable.ParimeBinaryStorage.read('media-blobs', 'sel-1',
								(pReadError, pBuffer) =>
								{
									libAssert.ok(!pReadError);
									libAssert.strictEqual(pBuffer.toString(), 'selected tiered');
									fDone();
								});
						});
				});
		});

		test("Type 'none' stays on the plain local store", function (fDone)
		{
			let tmpCache = libPath.join(TMP, 'none-cache');
			cleanDir(tmpCache);
			let tmpFable = new libFable(
				{
					Product: 'ParimeSelNone',
					ProductVersion: '1.0.0',
					ParimeBinaryStorageRoot: tmpCache,
					ParimeDurableBackend: { Type: 'none' }
				});
			tmpFable.addServiceType('ParimeStorage', libParimeStorage);
			tmpFable.instantiateServiceProvider('ParimeStorage');
			tmpFable.ParimeStorage.initialize(
				(pError) =>
				{
					libAssert.ok(!pError);
					libAssert.strictEqual(tmpFable.ParimeBinaryStorage.serviceType, 'ParimeBinaryStorage');
					fDone();
				});
		});
	}
);
