const Test = require("../modals/TestSchema");

exports.postTest = async (req, res) => {
	const data = req.body;

	try {
		const posting = await Test.create(data);
		if (posting) {
			return res.status(201).json({ message: "Test Uploaded Successfully" });
		}
	} catch (e) {
		console.log(e.message);
		res.status(401).json({ message: "Error: Cannot Upload Test" });
	}
};
exports.getTest = async (req, res) => {
	try {
		const tests = await Test.find(req.body);
		if (tests) {
			return res.status(201).json({
				results: tests.length,
				tests,
			});
		}
	} catch (e) {
		console.log(e.message);
	}
};

exports.deleteTests = async (req, res) => {
	try {
		const deleteTest = await Test.deleteMany();
		res.status(201).json({ mess: "Tests are deleted" });
	} catch (e) {
		console.log(e.message);
	}
};
exports.getTestByStudent = async (req, res) => {
	const query = req.query;
	console.log(query);

	try {
		const search = {
			studentResults: { $elemMatch: query },
		};
		const test = await Test.find(search);
		if (test) {
			return res.status(201).json(test);
		} else {
			return res.status(401).json({ mess: "Test Not Found" });
		}
	} catch (e) {
		console.log(e.message);
	}
};

exports.getTestById = async (req, res) => {
	console.log(req.params);
	try {
		const test = await Test.findById(req.params);
		res.status(201).json(test);
	} catch (e) {
		console.log(e);
	}
};
