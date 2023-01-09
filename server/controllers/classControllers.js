const Class = require("../modals/ClassSchema");

exports.addClass = async (req, res) => {
	const data = req.body;
	try {
		const exists = await Class.findOne({ name: data.name });
		if (exists) {
			res.status(401).json({ message: "Class Already Exists" });
		}
		const posting = await Class.create(data);

		if (posting) {
			return res.status(201).json({ message: "Class Created successfully" });
		}
	} catch (e) {
		console.log(e.message);
	}
};
exports.getAllClasses = async (req, res) => {
	const query = req.query;

	try {
		if (query.class === "select") {
			const classes = await Class.find({}, { subjects: 0, id: 0, __v: 0 });
			return res.status(201).json(classes);
		}
		const classes = await Class.find({}, {}).populate("subjects");

		if (classes) {
			return res.status(201).json(classes);
		}
	} catch (e) {
		console.log(e.message);
	}
};
exports.deleteClass = async (req, res) => {
	const _id = req.params;
	console.log(_id);
	try {
		const response = await Class.deleteOne(_id);
	} catch (e) {
		console.log(e);
	}
};
