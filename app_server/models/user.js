const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	display_name: {
		type: String,
		required: true
	},
	artist: {
		type: Boolean,
		required: true
	},
	commissions_open: {
		type: Boolean,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	phone_number: {
		type: String,
		required: false
	},
	twitter: {
		type: String,
		required: false
	},
	deviantart: {
		type: String,
		required: false
	},
	twitch_broadcaster: {
		type: Boolean,
		required: true
	}
});

mongoose.model('User', userSchema);