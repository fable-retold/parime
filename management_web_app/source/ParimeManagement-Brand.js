const tmpPackage = require('../package.json');

if (!tmpPackage.retold || !tmpPackage.retold.brand)
{
	throw new Error('parime-management: package.json is missing retold.brand — '
		+ 'run `npm run brand` (chained from prebuild) before building');
}

module.exports = tmpPackage.retold.brand;
