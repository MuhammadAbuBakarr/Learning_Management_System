const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const testSchema = new mongoose.Schema({
	id: { type: String, required: false, default: uuidv4() },
	date: { type: Date, required: true },
	details: { type: String, required: true },
	teacher: { type: String, required: true },
	Class: { type: String, required: true },
	subject: { type: String, required: false },
	totalMarks: { type: Number, required: true },
	studentResults: [
		{
			rollNumber: { type: String, required: true },
			obtainedMarks: { type: Number, required: true },
		},
	],
});
const Test = mongoose.model("test", testSchema);
module.exports = Test;

// {
//     "details": "Test # 3",
//     "teacher": "Moeed",
//     "Class": "10th Class",
//     "subject": "Urdu",
//     "totalMarks": 200,
//     "studentResults":[
//         {
//             "rollNumber": "0001",
//             "obtainedMarks": 120
//         },
//         {
//             "rollNumber": "0002",
//             "obtainedMarks": 100
//         },
//         {
//             "rollNumber": "0003",
//             "obtainedMarks": 90
//         },
//         {
//             "rollNumber": "0004",
//             "obtainedMarks": 130
//         },
//         {
//             "rollNumber": "0004",
//             "obtainedMarks": 140
//         }
//     ]
// }

//
