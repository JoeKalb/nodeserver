const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
	name: { 
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	customer: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	documents_count: {
		type: Number,
		required: true
	},
	complete: {
		type: Boolean,
		required: true
	},
	in_progress: {
		type: Boolean,
		required: true
	},
	created_at: {
		type: Date,
		required: true
	},
	updated_at: {
		type: Date
	}
});

mongoose.model('Art', artSchema);