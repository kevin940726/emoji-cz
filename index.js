"format cjs";

const merge = require('lodash.merge');
const engine = require('./engine');
const types = require('./types.json');
const getConfig = require('./getConfig');

const config = getConfig();

module.exports = engine({
  types: config && config.types ?
    merge(types, config.types) :
    types,
  format: config && config.format,
});
