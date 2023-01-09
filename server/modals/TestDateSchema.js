const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
	name: { type: String, required: true },
	date: { type: Date, required: true },
});

const myDate = mongoose.model("date", dateSchema);
module.exports = myDate;
