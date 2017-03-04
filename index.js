"format cjs";

var engine = require('./engine');
var types = require('./types.json');

module.exports = engine({
  types: types
});
