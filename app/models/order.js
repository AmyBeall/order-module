// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var OrderSchema = new Schema({
	vendor: String,
	customer: String,
	address: String,
	date: Date,
	setUpTime: Date,
	orderNum: String,
	item: [{
		Type: String,
		Name: String,
		Customization: String,
		Quantity: Number
	}],
	entryDate: Date,
	entryUser: String
});

module.exports = mongoose.model('Order', OrderSchema);
