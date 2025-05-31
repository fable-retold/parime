const libParimeServer = require(`../source/Parime-Server.js`);

const _ParimeServer = new libParimeServer();

_ParimeServer.initialize(
	() =>
	{
		_ParimeServer.fable.log.info(`Parime Server is initialized.`);
	});

