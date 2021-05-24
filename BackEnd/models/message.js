const mongoose = require('mongoose');

//DB schema
const messageSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	new: {
		type: Boolean,
		default: true
	},
	from: {
		type: String
	},
	fname: {
		type: String
	},
	lname: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	to: {
		type: String,
		required: true
	}
})

//export the model
module.exports = mongoose.model('Message', messageSchema);