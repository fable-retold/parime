/**
 * Parime Storage — Sharded Binary Storage and Headless Mode Tests
 *
 * Tests the sharding feature in ParimeBinaryStorage and the headless
 * Parime-Storage entry point (no HTTP server).
 */
const libAssert = require('assert');
const libFS = require('fs');
const libPath = require('path');

const libFable = require('fable');

const SHARDED_STORAGE_ROOT = libPath.join(__dirname, 'tmp-sharded-storage');
const HEADLESS_STORAGE_ROOT = libPath.join(__dirname, 'tmp-headless-storage');
const HEADLESS_BIBLIOGRAPH_ROOT = libPath.join(__dirname, 'tmp-headless-bibliograph');

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
	'Parime Sharded Storage',
	function ()
	{
		let _Fable = null;
		let _BinaryStorage = null;

		suiteSetup
		(
			function (fDone)
			{
				cleanDir(SHARDED_STORAGE_ROOT);

				_Fable = new libFable(
					{
						Product: 'ParimeShardTest',
						ProductVersion: '1.0.0',
						ParimeBinaryStorageRoot: SHARDED_STORAGE_ROOT,
						ParimeBinarySharding:
						{
							Enabled: true,
							SegmentSize: 2,
							Depth: 4
						}
					});

				let libParimeBinaryStorage = require('../source/services/Parime-BinaryStorage.js');
				_Fable.addServiceType('ParimeBinaryStorage', libParimeBinaryStorage);
				_BinaryStorage = _Fable.instantiateServiceProvider('ParimeBinaryStorage');

				_BinaryStorage.initialize(fDone);
			}
		);

		suiteTeardown
		(
			function ()
			{
				cleanDir(SHARDED_STORAGE_ROOT);
			}
		);

		// ====================================================================
		// computeShardPath
		// ====================================================================
		suite
		(
			'computeShardPath',
			function ()
			{
				test
				(
					'should produce correct segments for a normal hash',
					function ()
					{
						let tmpResult = _BinaryStorage.computeShardPath('234381asf9af01bc');
						libAssert.strictEqual(tmpResult, '23/43/81/as');
					}
				);

				test
				(
					'should produce correct segments for a hex hash',
					function ()
					{
						let tmpResult = _BinaryStorage.computeShardPath('abcdef1234567890');
						libAssert.strictEqual(tmpResult, 'ab/cd/ef/12');
					}
				);

				test
				(
					'should handle hash exactly long enough for configured depth',
					function ()
					{
						// SegmentSize=2, Depth=4 needs 8 chars minimum
						let tmpResult = _BinaryStorage.computeShardPath('12345678');
						libAssert.strictEqual(tmpResult, '12/34/56/78');
					}
				);

				test
				(
					'should gracefully truncate for short hashes',
					function ()
					{
						// Only 4 chars — enough for 2 segments, not 4
						let tmpResult = _BinaryStorage.computeShardPath('abcd');
						libAssert.strictEqual(tmpResult, 'ab/cd');
					}
				);

				test
				(
					'should return empty for very short hashes',
					function ()
					{
						let tmpResult = _BinaryStorage.computeShardPath('a');
						libAssert.strictEqual(tmpResult, '');
					}
				);

				test
				(
					'should strip slashes before computing shard path',
					function ()
					{
						// Hash with slashes: "ab/cd/ef/gh/ijkl" → strip slashes → "abcdefghijkl"
						let tmpResult = _BinaryStorage.computeShardPath('ab/cd/ef/gh/ijkl');
						libAssert.strictEqual(tmpResult, 'ab/cd/ef/gh');
					}
				);
			}
		);

		// ====================================================================
		// resolvePath with sharding
		// ====================================================================
		suite
		(
			'resolvePath with sharding',
			function ()
			{
				test
				(
					'should interpolate shard directories between category and hash',
					function ()
					{
						let tmpPath = _BinaryStorage.resolvePath('thumbnails', 'abcdef1234567890.webp');
						let tmpExpected = libPath.join(SHARDED_STORAGE_ROOT, 'thumbnails', 'ab', 'cd', 'ef', '12', 'abcdef1234567890.webp');
						libAssert.strictEqual(tmpPath, tmpExpected);
					}
				);

				test
				(
					'should handle keys with slashes (nested below shard)',
					function ()
					{
						let tmpPath = _BinaryStorage.resolvePath('video-frames', 'abcdef1234567890/manifest.json');
						let tmpExpected = libPath.join(SHARDED_STORAGE_ROOT, 'video-frames', 'ab', 'cd', 'ef', '12', 'abcdef1234567890', 'manifest.json');
						libAssert.strictEqual(tmpPath, tmpExpected);
					}
				);
			}
		);

		// ====================================================================
		// Write / Read / Exists / Stat / Delete round-trip
		// ====================================================================
		suite
		(
			'CRUD operations with sharding',
			function ()
			{
				let _TestKey = 'a1b2c3d4e5f6g7h8';
				let _TestBuffer = Buffer.from('Hello sharded world!');

				test
				(
					'should write to a sharded path',
					function (fDone)
					{
						_BinaryStorage.write('TestSharded', _TestKey, _TestBuffer,
							(pError) =>
							{
								libAssert.ifError(pError);

								// Verify the file physically exists at the sharded path
								let tmpExpectedPath = libPath.join(SHARDED_STORAGE_ROOT, 'TestSharded', 'a1', 'b2', 'c3', 'd4', _TestKey);
								libAssert.ok(libFS.existsSync(tmpExpectedPath), `File should exist at sharded path: ${tmpExpectedPath}`);

								return fDone();
							});
					}
				);

				test
				(
					'should read from a sharded path',
					function (fDone)
					{
						_BinaryStorage.read('TestSharded', _TestKey,
							(pError, pData) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(Buffer.isBuffer(pData));
								libAssert.ok(pData.equals(_TestBuffer));
								return fDone();
							});
					}
				);

				test
				(
					'should check existence on a sharded path',
					function (fDone)
					{
						_BinaryStorage.exists('TestSharded', _TestKey,
							(pError, pExists) =>
							{
								libAssert.ifError(pError);
								libAssert.strictEqual(pExists, true);
								return fDone();
							});
					}
				);

				test
				(
					'should return false for non-existent key',
					function (fDone)
					{
						_BinaryStorage.exists('TestSharded', 'nonexistent00000',
							(pError, pExists) =>
							{
								libAssert.ifError(pError);
								libAssert.strictEqual(pExists, false);
								return fDone();
							});
					}
				);

				test
				(
					'should get stats on a sharded path',
					function (fDone)
					{
						_BinaryStorage.stat('TestSharded', _TestKey,
							(pError, pStats) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(pStats);
								libAssert.strictEqual(pStats.size, _TestBuffer.length);
								return fDone();
							});
					}
				);

				test
				(
					'should stream from a sharded path',
					function (fDone)
					{
						let tmpStream = _BinaryStorage.readStream('TestSharded', _TestKey);
						let tmpChunks = [];
						tmpStream.on('data', (pChunk) => { tmpChunks.push(pChunk); });
						tmpStream.on('end',
							() =>
							{
								let tmpResult = Buffer.concat(tmpChunks);
								libAssert.ok(tmpResult.equals(_TestBuffer));
								return fDone();
							});
						tmpStream.on('error', (pError) => { return fDone(pError); });
					}
				);

				test
				(
					'should write and read a key with slashes (multi-file entry)',
					function (fDone)
					{
						let tmpManifest = Buffer.from(JSON.stringify({ Success: true, Frames: 20 }));
						let tmpFrameData = Buffer.from('fake frame data');

						_BinaryStorage.write('video-frames', 'abc123def456ghij/manifest.json', tmpManifest,
							(pError) =>
							{
								libAssert.ifError(pError);

								_BinaryStorage.write('video-frames', 'abc123def456ghij/frame_0000.jpg', tmpFrameData,
									(pError) =>
									{
										libAssert.ifError(pError);

										// Read them back
										_BinaryStorage.read('video-frames', 'abc123def456ghij/manifest.json',
											(pError, pData) =>
											{
												libAssert.ifError(pError);
												let tmpParsed = JSON.parse(pData.toString());
												libAssert.strictEqual(tmpParsed.Success, true);
												libAssert.strictEqual(tmpParsed.Frames, 20);

												_BinaryStorage.read('video-frames', 'abc123def456ghij/frame_0000.jpg',
													(pError, pData) =>
													{
														libAssert.ifError(pError);
														libAssert.ok(pData.equals(tmpFrameData));
														return fDone();
													});
											});
									});
							});
					}
				);

				test
				(
					'should delete from a sharded path',
					function (fDone)
					{
						_BinaryStorage.delete('TestSharded', _TestKey,
							(pError) =>
							{
								libAssert.ifError(pError);

								_BinaryStorage.exists('TestSharded', _TestKey,
									(pError, pExists) =>
									{
										libAssert.ifError(pError);
										libAssert.strictEqual(pExists, false);
										return fDone();
									});
							});
					}
				);
			}
		);

		// ====================================================================
		// listKeys with sharding
		// ====================================================================
		suite
		(
			'listKeys with sharding',
			function ()
			{
				let _Keys = ['zzzz11112222aaaa', 'bbbb33334444cccc', 'dddd55556666eeee'];

				suiteSetup
				(
					function (fDone)
					{
						let tmpRemaining = _Keys.length;
						for (let i = 0; i < _Keys.length; i++)
						{
							_BinaryStorage.write('ListTest', _Keys[i], Buffer.from(`data-${i}`),
								(pError) =>
								{
									libAssert.ifError(pError);
									tmpRemaining--;
									if (tmpRemaining === 0)
									{
										return fDone();
									}
								});
						}
					}
				);

				test
				(
					'should return flat keys without shard prefix',
					function (fDone)
					{
						_BinaryStorage.listKeys('ListTest',
							(pError, pKeys) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(Array.isArray(pKeys));
								libAssert.strictEqual(pKeys.length, _Keys.length);

								// All original keys should be present (order may vary)
								let tmpSorted = pKeys.slice().sort();
								let tmpExpected = _Keys.slice().sort();
								libAssert.deepStrictEqual(tmpSorted, tmpExpected);
								return fDone();
							});
					}
				);

				test
				(
					'should return nested keys with slash structure intact',
					function (fDone)
					{
						_BinaryStorage.listKeys('video-frames',
							(pError, pKeys) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(Array.isArray(pKeys));
								// Should find both manifest.json and frame_0000.jpg from earlier test
								let tmpManifestKey = pKeys.find((pK) => { return pK.indexOf('manifest.json') >= 0; });
								let tmpFrameKey = pKeys.find((pK) => { return pK.indexOf('frame_0000.jpg') >= 0; });
								libAssert.ok(tmpManifestKey, 'Should find manifest.json key');
								libAssert.ok(tmpFrameKey, 'Should find frame_0000.jpg key');
								// Keys should include the hash prefix directory
								libAssert.ok(tmpManifestKey.startsWith('abc123def456ghij/'));
								return fDone();
							});
					}
				);

				test
				(
					'should return empty array for non-existent category',
					function (fDone)
					{
						_BinaryStorage.listKeys('NoSuchCategory',
							(pError, pKeys) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(Array.isArray(pKeys));
								libAssert.strictEqual(pKeys.length, 0);
								return fDone();
							});
					}
				);
			}
		);

		// ====================================================================
		// Disabled sharding (backward compatibility)
		// ====================================================================
		suite
		(
			'Disabled sharding (backward compat)',
			function ()
			{
				let _FlatFable = null;
				let _FlatStorage = null;
				let _FlatRoot = libPath.join(__dirname, 'tmp-flat-storage');

				suiteSetup
				(
					function (fDone)
					{
						cleanDir(_FlatRoot);

						_FlatFable = new libFable(
							{
								Product: 'ParimeFlatTest',
								ProductVersion: '1.0.0',
								ParimeBinaryStorageRoot: _FlatRoot
								// No ParimeBinarySharding — defaults to disabled
							});

						let libParimeBinaryStorage = require('../source/services/Parime-BinaryStorage.js');
						_FlatFable.addServiceType('ParimeBinaryStorage', libParimeBinaryStorage);
						_FlatStorage = _FlatFable.instantiateServiceProvider('ParimeBinaryStorage');

						_FlatStorage.initialize(fDone);
					}
				);

				suiteTeardown
				(
					function ()
					{
						cleanDir(_FlatRoot);
					}
				);

				test
				(
					'computeShardPath returns empty string when disabled',
					function ()
					{
						let tmpResult = _FlatStorage.computeShardPath('abcdef1234567890');
						libAssert.strictEqual(tmpResult, '');
					}
				);

				test
				(
					'resolvePath produces flat path when sharding is disabled',
					function ()
					{
						let tmpPath = _FlatStorage.resolvePath('mycat', 'somehash.dat');
						let tmpExpected = libPath.join(_FlatRoot, 'mycat', 'somehash.dat');
						libAssert.strictEqual(tmpPath, tmpExpected);
					}
				);

				test
				(
					'write/read round-trip without sharding',
					function (fDone)
					{
						let tmpBuffer = Buffer.from('flat storage test');
						_FlatStorage.write('FlatCat', 'flatkey001', tmpBuffer,
							(pError) =>
							{
								libAssert.ifError(pError);

								// Verify file is at flat path
								let tmpExpectedPath = libPath.join(_FlatRoot, 'FlatCat', 'flatkey001');
								libAssert.ok(libFS.existsSync(tmpExpectedPath));

								_FlatStorage.read('FlatCat', 'flatkey001',
									(pError, pData) =>
									{
										libAssert.ifError(pError);
										libAssert.ok(pData.equals(tmpBuffer));
										return fDone();
									});
							});
					}
				);

				test
				(
					'listKeys works without sharding',
					function (fDone)
					{
						_FlatStorage.listKeys('FlatCat',
							(pError, pKeys) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(pKeys.indexOf('flatkey001') >= 0);
								return fDone();
							});
					}
				);
			}
		);
	}
);

// ========================================================================
// Headless Parime Storage
// ========================================================================
suite
(
	'Parime Headless Storage',
	function ()
	{
		let _Fable = null;
		let _ParimeStorage = null;

		suiteSetup
		(
			function (fDone)
			{
				this.timeout(10000);

				cleanDir(HEADLESS_STORAGE_ROOT);
				cleanDir(HEADLESS_BIBLIOGRAPH_ROOT);

				_Fable = new libFable(
					{
						Product: 'ParimeHeadlessTest',
						ProductVersion: '1.0.0',
						ParimeBinaryStorageRoot: HEADLESS_STORAGE_ROOT,
						'Bibliograph-Storage-FS-Path': HEADLESS_BIBLIOGRAPH_ROOT,
						ParimeBinarySharding:
						{
							Enabled: true,
							SegmentSize: 2,
							Depth: 3
						}
					});

				let libParimeStorage = require('../source/Parime-Storage.js');
				_Fable.addServiceType('ParimeStorage', libParimeStorage);
				_ParimeStorage = _Fable.instantiateServiceProvider('ParimeStorage');

				_ParimeStorage.initialize(fDone);
			}
		);

		suiteTeardown
		(
			function ()
			{
				cleanDir(HEADLESS_STORAGE_ROOT);
				cleanDir(HEADLESS_BIBLIOGRAPH_ROOT);
			}
		);

		test
		(
			'should initialize without an HTTP server',
			function ()
			{
				libAssert.ok(_ParimeStorage);
				libAssert.ok(_Fable.ParimeBinaryStorage);
				libAssert.ok(_Fable.Bibliograph);
				// No Orator should be present
				libAssert.strictEqual('Orator' in _Fable, false);
			}
		);

		test
		(
			'should write and read binary data via embedded storage',
			function (fDone)
			{
				let tmpBuffer = Buffer.from('headless binary data');
				_Fable.ParimeBinaryStorage.write('headless-test', 'ff00aa11bb22cc33', tmpBuffer,
					(pError) =>
					{
						libAssert.ifError(pError);

						_Fable.ParimeBinaryStorage.read('headless-test', 'ff00aa11bb22cc33',
							(pError, pData) =>
							{
								libAssert.ifError(pError);
								libAssert.ok(pData.equals(tmpBuffer));
								return fDone();
							});
					});
			}
		);

		test
		(
			'should use sharded paths in headless mode',
			function ()
			{
				// Depth=3, SegmentSize=2
				let tmpPath = _Fable.ParimeBinaryStorage.resolvePath('headless-test', 'ff00aa11bb22cc33');
				let tmpExpected = libPath.join(HEADLESS_STORAGE_ROOT, 'headless-test', 'ff', '00', 'aa', 'ff00aa11bb22cc33');
				libAssert.strictEqual(tmpPath, tmpExpected);
			}
		);

		test
		(
			'should list keys in headless mode',
			function (fDone)
			{
				_Fable.ParimeBinaryStorage.listKeys('headless-test',
					(pError, pKeys) =>
					{
						libAssert.ifError(pError);
						libAssert.ok(Array.isArray(pKeys));
						libAssert.ok(pKeys.indexOf('ff00aa11bb22cc33') >= 0);
						return fDone();
					});
			}
		);

		test
		(
			'should have Bibliograph and helpers available',
			function ()
			{
				libAssert.ok(_Fable.Bibliograph, 'Bibliograph should be wired into fable');
				libAssert.ok(_Fable.ParimeBibliographHelpers, 'ParimeBibliographHelpers should be wired');
				libAssert.ok(_Fable.ParimeLakeValidation, 'ParimeLakeValidation should be wired');
			}
		);
	}
);
