// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var OrderSchema = new Schema({
	vendor: String,
	orderNum: String,
	company: String,
	contact: String,
	address: String,
	city: String,
	phone: Number,
	orderDate: Date,
	setUpTime: Date,
	headCount: Number,
	total: String,
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
