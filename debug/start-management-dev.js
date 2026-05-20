/**
 * Dev launcher for the Parime Management Console.
 *
 * Boots a Pict instance, registers the Parime server as a service, and
 * starts the HTTP listener on the configured port. Used by the preview
 * harness (.claude/launch.json) and for manual `node debug/start-management-dev.js`
 * smoke checks.
 */

const libPath = require('path');
const libPict = require('pict');
const libParimeServer = require('../source/Parime-Server.js');

const tmpStorageRoot = libPath.resolve(__dirname, '..', '.parime-dev-storage');

const _Pict = new libPict(
	{
		Product: 'Parime',
		ProductVersion: require('../package.json').version,
		APIServerPort: 9999,
		ParimeBinaryStorageRoot: libPath.join(tmpStorageRoot, 'binary'),
		'Bibliograph-Storage-FS-Path': libPath.join(tmpStorageRoot, 'records'),
		ParimeManagementWebAppPath: libPath.resolve(__dirname, '..', 'management_web_app_built'),
		RestifyConfiguration:
		{
			strictNext: true,
			handleUpgrades: true
		}
	});

_Pict.addServiceType('ParimeServer', libParimeServer);
let _ParimeServer = _Pict.instantiateServiceProvider('ParimeServer');

_ParimeServer.initialize((pError) =>
{
	if (pError)
	{
		_Pict.log.error('Failed to initialize Parime server: ' + pError.message);
		process.exit(1);
	}
	_Pict.log.info('Parime Management Console dev server ready on http://localhost:9999/1.0/ManagementApp/');
});
