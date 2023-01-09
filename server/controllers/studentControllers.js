const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const Student = require("../modals/StudentSchema");

exports.signUpAsStudent = async (req, res) => {
	const data = req.body;
	try {
		const exists = await Student.findOne({ rollNumber: data.rollNumber });
		if (exists) {
			return res.status(401).json({
				message: "Cannot Register Roll No Already Exists",
			});
		}
		const salt = await bcrypt.genSalt(10);
		data.password = await bcrypt.hash(data.password, salt);
		data.cpassword = await bcrypt.hash(data.cpassword, salt);
		await Student.create(data);
		res.status(201).json({
			message: "Student Registered Successfully",
		});
	} catch (e) {
		if (e) {
			res.status(401).json({ message: "Cannot Register Student" });
		}
		console.log(e.message);
	}
};

exports.loginStudent = async (req, res) => {
	const data = req.body;
	try {
		const myUser = await Student.findOne({ rollNumber: data.rollNumber })
			.populate("class", { subjects: 0 })
			.populate("subjects", { teachers: 0 });
		if (!myUser) {
			return res.status(401).json({
				message: "Wrong user Credentials",
			});
		}
		const validPassword = await bcrypt.compare(data.password, myUser.password);
		if (!validPassword) {
			return res.status(401).json({
				message: "Wrong user Credentials",
			});
		}
		myUser.password = undefined;
		myUser.cpassword = undefined;
		const token = jwt.sign({ id: myUser.id }, secretKey);
		res.cookie("mycookie", token).status(200).json(myUser);
	} catch (e) {
		console.log(e.message);
	}
};
exports.deleteAllStudents = async (req, res) => {
	try {
		const deleteAll = await Student.deleteMany();
		res.status(200).json({
			messsage: "All Students are deleted",
		});
	} catch (error) {
		if (error) {
			return res.status(401);
		}
	}
};

exports.deleteSingleStudent = async (req, res) => {
	const _id = req.params;

	try {
		const deleteAll = await Student.deleteOne(_id);
		console.log(deleteAll);
		return res.status(200).json({
			mess: "This Student is Deleted",
		});
	} catch (e) {
		console.log(e.message);
	}
};
exports.getStudent = async (req, res) => {
	const query = req.query;
	const queryName = Object.keys(query);
	try {
		if (queryName[0] === "rollNumber") {
			const excludeFields = {
				password: 0,
				cpassword: 0,
				subjects: 0,
				fatherName: 0,
			};
			const student = await Student.findOne(query, excludeFields).populate(
				"class",
				{ subjects: 0 }
			);
			if (student) {
				return res.status(201).json(student);
			}
		}
		if (queryName[0] === "class") {
			const students = await Student.find({}, { password: 0, cpassword: 0 })
				.populate("class", { subjects: 0 })
				.populate("subjects", { teachers: 0 });

			const findByClass = students.filter((e) => e.class.name === query.class);

			if (students) {
				return res.status(201).json({
					results: findByClass.length,
					students: findByClass,
				});
			}
		}
		const students = await Student.find({}, { password: 0, cpassword: 0 })
			.populate("class", { subjects: 0 })
			.populate("subjects", { teachers: 0 });

		if (students) {
			return res.status(201).json({
				results: students.length,
				students,
			});
		}
	} catch (e) {
		console.log(e.message);
	}
};
