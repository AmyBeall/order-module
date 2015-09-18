// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var JobSchema = new Schema({
		order: Number,
		job: Object,
		applied: String,
		resonse: String,
		notes: [{
			title: String,
			note: String
		}]
});

module.exports = mongoose.model('Job', JobSchema);