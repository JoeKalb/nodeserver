const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
	customer: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	commission_count: {
		type: Number,
		required: true
	},
	paid: {
		type: Boolean,
		required: true
	}
})