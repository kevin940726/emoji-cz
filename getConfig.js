const findConfig = require('find-config');

const PKG_NAME = 'emoji-cz';

const getConfig = (cwd = process.cwd()) => {
  // find package.json
  const pkg = findConfig.require('package.json', { cwd });
  if (pkg && pkg.config && pkg.config.commitizen && pkg.config.commitizen[PKG_NAME]) {
    return pkg.config.commitizen[PKG_NAME];
  }

  // find .cz.json
  const czjson = findConfig.require('.cz.json', { cwd });
  if (czjson && czjson[PKG_NAME]) {
    return czjson[PKG_NAME];
  }

  // find .czrc
  const czrc = JSON.parse(findConfig.read('.czrc', { cwd }));
  if (czrc && czrc[PKG_NAME]) {
    return czrc[PKG_NAME];
  }
}

module.exports = getConfig;
