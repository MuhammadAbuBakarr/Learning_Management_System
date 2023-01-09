const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const StudentSchema = new mongoose.Schema({
	id: { type: String, required: false, default: uuidv4() },
	name: { type: String, required: true },
	fatherName: { type: String, required: true },
	password: { type: String, required: true },
	cpassword: { type: String, required: true },
	rollNumber: { type: String, required: true },
	role: { type: String, default: "student" },
	class: { type: mongoose.Schema.ObjectId, required: false, ref: "class" },
	subjects: [
		{ type: mongoose.Schema.ObjectId, required: false, ref: "subject" },
	],
});

const Student = mongoose.model("students", StudentSchema);
module.exports = Student;

//   {
//     "name": "Student 1",
//     "fatherName": "Father 1",
//     "password": "admin",
//     "cpassword": "admin",
//     "rollNumber": "0001",
//     "class": "639c899c82ed2bc66ba816a2",
//     "subjects": [
// 			"6398d646759fbc670b421902",
//     		"6398d8efd3f51da14633a608"
//     ]
//   }
