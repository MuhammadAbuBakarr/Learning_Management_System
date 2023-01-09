const myDate = require("../modals/TestDateSchema");

exports.postdate = async (req, res) => {
	console.log(req.body);
	try {
		const payload = await myDate.create(req.body);
		if (payload) {
			res.status(201).json(payload);
		}
	} catch (e) {
		console.log(e);
	}
};

exports.getAll = async (req, res) => {
	try {
		const response = await myDate.find();
		res.status(201).json(response);
	} catch (e) {
		console.log(e);
	}
};
