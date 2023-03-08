const { calculationService } = require("../services");

const xtend = require('xtend')

exports.calculate = async function (req, res, next) {
	

		let transaction = await calculationService.create(xtend(req.body, {user: req.user.id}));
		console.log(transaction, "transaction");
		res.json(transaction);
	
};

exports.deleteOrder = async function (req, res, next) {
	let order = await calculationService.deleteOrder(req.params.id);
	res.json(order);
};

exports.confirmOrder = async function (req, res, next) {
	// io.emit("test", { data: "hi" });
	console.log("starting to confirm, order controller");

	const order = await calculationService.approveOrder(req.params.id);
	console.log("service done, order controller");

	res.json({
		order: order._id,
		user: order.user,
		status: order.status,
		confirmedAt: order.confirmedAt,
	});
};
