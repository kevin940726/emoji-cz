"format cjs";

const engine = require('./engine');
const types = require('./types.json');
const getConfig = require('./getConfig');

const config = getConfig();

module.exports = engine({
  types: config && config.types ?
    Object.assign({}, types, config.types) :
    types,
});
