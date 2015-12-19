var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var UserSchema = new Schema({
		name: String,
		pictureURL: String,
		emailAddress: String,
		password: String,
		jobSearch: String,
		jobLocation: String,
		about: String
});

module.exports = mongoose.model('User', UserSchema);
