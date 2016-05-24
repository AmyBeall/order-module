// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var InventorySchema = new Schema({
	date: Date,
	item: [{
		name: String,
		quantity: String
	}],
});

module.exports = mongoose.model('Inventory', InventorySchema);