const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const myDate = new Date().toDateString();

const attendanceSchema = new mongoose.Schema({
	id: { type: String, required: false, default: uuidv4() },
	rollNumber: { type: String, required: true },
	present: { type: Boolean, required: false, default: false },
	date: { type: String, required: false, default: myDate },
});

const Attendance = mongoose.model("attendance", attendanceSchema);
module.exports = Attendance;
