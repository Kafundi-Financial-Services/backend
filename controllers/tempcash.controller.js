
const { tempCashService } = require("../services");
const xtend = require('xtend');

exports.newTransaction = async function (req, res, next) {
	console.log(req.body, "req.boy", req.user.id, "user");

const debt = await tempCashService.create(xtend(req.body, { user: req.user.id }));
res.json(debt);
};

exports.deleteTempcash = async function (req, res, next) {
	let order = await tempCashService.deleteTempcash(req.params.id);
	res.json(order);
};

exports.confirmTempcash = async function (req, res, next) {
	// io.emit("test", { data: "hi" });
	console.log("starting to confirm, order controller");

	const order = await tempCashService.approveTempcash(req.params.id);
	console.log("service done, order controller");

	res.json({
		order: order._id,
		user: order.user,
		status: order.status,
		confirmedAt: order.confirmedAt,
	});
};
