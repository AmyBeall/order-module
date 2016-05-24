var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var ItemSchema = new Schema({
		type: String,
		typeList: [{
			name: String,
			ingredients: [String],
		}]
});

module.exports = mongoose.model('Item', ItemSchema);