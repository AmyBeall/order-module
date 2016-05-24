var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var UserSchema = new Schema({
		name: String,
		emailAddress: String,
		password: String,
		jobLocation: String,
		level: Number
});

module.exports = mongoose.model('User', UserSchema);
