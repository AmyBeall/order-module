// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var JobSchema = new Schema({
		user: Number,
		boardPos: String,
		order: Number,
		job: Object,
		notes: [{
			title: String,
			note: String
		}],
		appliedDate: Date,
		rejected: Boolean,
		interview:[{
			name: String,
			notes: String
		}]
});

module.exports = mongoose.model('Job', JobSchema);
