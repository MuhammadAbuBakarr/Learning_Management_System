const Subject = require("../modals/SubjectSchema");

exports.postSubject = async (req, res) => {
	const data = req.body;
	try {
		const exists = await Subject.findOne({ name: data.name });
		if (exists) {
			res.status(401).json({ message: "Subject Already Exists" });
		}

		const posting = await Subject.create(data);
		if (posting) {
			res.status(201).json({ message: "Subject is Created" });
		}
	} catch (e) {
		console.log(e.message);
		res.status(401).json({ message: "Subject Cannot be Created, Try Again" });
	}
};
exports.getSubject = async (req, res) => {
	const query = req.query;
	try {
		if (query.subject === "select") {
			const subjects = await Subject.find({}, { __v: 0, teachers: 0, id: 0 });
			return res.status(201).json(subjects);
		}

		const subjects = await Subject.find({}, {}).populate("teachers", {
			name: 1,
			_id: 1,
		});
		if (subjects) {
			return res.status(201).json(subjects);
		}
	} catch (e) {
		console.log(e.message);
	}
};
exports.deleteAllSubjects = async (req, res) => {
	try {
		const data = await Subject.deleteMany();
		console.log(data);
		res.status(201).json({ mess: "Subjects are deleted" });
	} catch (e) {
		console.log(e.message);
	}
};
exports.deleteSubject = async (req, res) => {
	const _id = req.params;
	try {
		const response = await Subject.deleteOne(_id);
		res.send("Subject is deleted");
	} catch (e) {
		console.log(e);
	}
};
