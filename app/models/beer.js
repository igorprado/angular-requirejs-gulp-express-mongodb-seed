var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BeerSchema   = new Schema({
	name: String,
  type: String
});

module.exports = mongoose.model('Beer', BeerSchema);