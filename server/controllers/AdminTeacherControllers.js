const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const AdminTeacher = require("../modals/Admin.Teacher.Schema");

exports.signUpAsAdminTeacher = async (req, res) => {
	const data = req.body;
	try {
		const exists = await AdminTeacher.findOne({ name: data.name });
		if (exists) {
			return res.status(401).json({
				message: "Name Already Exists Enter Another Name",
			});
		}
		const salt = await bcrypt.genSalt(10);
		data.password = await bcrypt.hash(data.password, salt);
		data.cpassword = await bcrypt.hash(data.cpassword, salt);
		const user = await AdminTeacher.create(data);
		if (user) {
			res.status(201).json({
				message: "Your Registration is Complete",
			});
		}
	} catch (e) {
		if (e) {
			res.status(401);
			console.log(e.message);
		}
	}
};
exports.loginAdminTeacher = async (req, res) => {
	const data = req.body;
	try {
		const myUser = await AdminTeacher.findOne({ name: data.name }, { __v: 0 })
			.populate("classes", { subjects: 0, __v: 0 })
			.populate("subjects", { teachers: 0, __v: 0 });
		if (!myUser) {
			return res.status(401).json({
				message: "Cannot Login Because of Wrong Info",
			});
		}
		const validPassword = await bcrypt.compare(data.password, myUser.password);
		if (!validPassword) {
			return res.status(401).json({
				message: "Password did not Match",
			});
		}
		const token = jwt.sign({ id: myUser.id }, secretKey);
		myUser.password = undefined;
		myUser.cpassword = undefined;
		res.cookie("mycookie", token).status(200).json(myUser);
	} catch (e) {
		console.log(e.message);
	}
};

exports.getTeachers = async (req, res) => {
	const query = req.query;
	try {
		if (query.teacher === "select") {
			const teachers = await AdminTeacher.find({}, { _id: 1, name: 1 });
			return res.status(201).json(teachers);
		}
		const teachers = await AdminTeacher.find({}, { password: 0, cpassword: 0 })
			.populate("classes", { subjects: 0 })
			.populate("subjects", { teachers: 0 });
		if (teachers) {
			return res.status(201).json({
				results: teachers.length,
				teachers,
			});
		}
	} catch (e) {
		console.log(e.message);
		res.status(401).json({ message: "Cannot get Teachers" });
	}
};

exports.deleteAllTeachers = async (req, res) => {
	try {
		await AdminTeacher.deleteMany();
		res.status(200).json({
			messsage: "All Teachers are deleted",
		});
	} catch (error) {
		console.log(error.message);

		if (error) {
			return res.status(401);
		}
	}
};

exports.deleteTeacher = async (req, res) => {
	const id = req.params;
	try {
		await AdminTeacher.deleteOne(id);
		res.status(200).json({
			messsage: "This Teacher is deleted",
		});
	} catch (error) {
		console.log(error.message);

		if (error) {
			return res.status(401);
		}
	}
};
