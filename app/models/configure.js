var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var ConfigureSchema = new Schema({
		type: String,
		list: [String]
});

module.exports = mongoose.model('Configure', ConfigureSchema);