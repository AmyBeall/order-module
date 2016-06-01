// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var OrderSchema = new Schema({
	vendor: String,
	customer: String,
	address: String,
	pickUpdate: Date,
	pickUpTime: Date,
	orderNum: String,
	item: [{
		type: String,
		name: String,
		ingredients: [String],
		customization: String,
		quantity: Number
	}],
	entryDate: Date
});

module.exports = mongoose.model('Order', OrderSchema);
