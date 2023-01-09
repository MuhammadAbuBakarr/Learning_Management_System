const Attendance = require("../modals/AttendanceSchema");
const Student = require("../modals/StudentSchema");

exports.markPresent = async (req, res) => {
	const data = req.body;
	const present = { present: true };
	console.log(data);
	try {
		const attendance = await Attendance.findOneAndUpdate(data, present);
		console.log(attendance);
		if (attendance) {
			res.status(201).json({
				mess: "Attandance Marked",
			});
		}
		res.status(401).json({
			mess: "Attandance cannot be marked",
		});
	} catch (e) {
		console.log(e.message);
	}
};

exports.deleteAllAttendance = async (req, res) => {
	try {
		await Attendance.deleteMany();
		res.status(201).json({
			mess: "Products are deleted",
		});
	} catch (e) {
		console.log(e.message);
		res.status(401);
	}
};

exports.getAttendance = async (req, res) => {
	try {
		Attendance.find({}, (err, data) => {
			res.status(201).json({
				total: data.length,
				data,
			});
		});
	} catch (e) {
		console.log(e.message);
		res.status(401);
	}
};

exports.findAtten = async (req, res) => {
	const date = new Date().toDateString();
	try {
		Attendance.find(
			{ date: { $gte: "Sat Dec 01 2022", $lte: "Sat Dec 14 2022" } },
			(err, data) => {
				res.status(201).json(data);
			}
		);
	} catch (e) {
		console.log(e);
	}
};
exports.postAttendanceDaily = async () => {
	console.log("Uploading Attendance");
	try {
		const student = await Student.find({}, { rollNumber: 1, _id: 0 });
		if (student) {
			await Attendance.insertMany(student);
		}
	} catch (e) {
		console.log(e.message);
	}
};
