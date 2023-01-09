const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const classSchema = new mongoose.Schema({
	id: { type: String, required: false, default: uuidv4() },
	name: { type: String, required: true },
	subjects: [
		{
			type: mongoose.Schema.ObjectId,
			required: false,
			ref: "subject",
		},
	],
});

const Class = mongoose.model("class", classSchema);
module.exports = Class;
