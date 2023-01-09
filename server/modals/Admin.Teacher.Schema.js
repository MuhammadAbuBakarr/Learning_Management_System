const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const adminTeacherSchema = new mongoose.Schema({
	id: { type: String, required: true, default: uuidv4() },
	name: { type: String, required: true },
	password: { type: String, required: true },
	cpassword: { type: String, required: true },
	role: { type: String, required: true },
	classes: [{ type: mongoose.Schema.ObjectId, required: false, ref: "class" }],
	subjects: [
		{ type: mongoose.Schema.ObjectId, required: false, ref: "subject" },
	],
});

const AdminTeacher = mongoose.model("adminTeacher", adminTeacherSchema);
module.exports = AdminTeacher;

// {
//     "name": "AbuBakar",
//     "email": "abu@abu.com",
//     "password": "admin",
//     "cpassword": "admin",
//     "role": "admin",
// 		"classes": [
// 			"639c899c82ed2bc66ba816a2"
//       ],
// 		"subjects": [
// 			"6398d646759fbc670b421902"
//    ]
//   }
