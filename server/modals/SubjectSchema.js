const mongoose = require("mongoose");
const AdminTeacher = require("../modals/Admin.Teacher.Schema");
const { v4: uuidv4 } = require("uuid");

const subjectSchema = new mongoose.Schema({
	id: { type: String, required: false, default: uuidv4() },
	name: { type: String, required: true },
	teachers: [
		{
			type: mongoose.Schema.ObjectId,
			required: false,
			ref: "adminTeacher",
		},
	],
});

const Subject = mongoose.model("subject", subjectSchema);
module.exports = Subject;

// 639c9afee16a0b828263a1e5 moeed

// 639c9b82e16a0b828263a1eb bakar
