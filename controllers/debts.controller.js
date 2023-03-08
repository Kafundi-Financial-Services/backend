const Transactions = require("../models/transactions");
const { debtService } = require("../services");
const AppError = require("../utils/AppError");
const httpStatus = require("http-status");
const xtend = require("xtend");

exports.create = async function (req, res, next) {
	console.log(req.body, "req.boy", req.user.id, "user");
	const debt = await debtService.create(xtend(req.body, {user: req.user.id}));
	res.json(debt)

};

exports.deleteOrder = async function (req, res, next) {
	let order = await debtService.deleteOrder(req.params.id);
	res.json(order);
};

exports.confirmOrder = async function (req, res, next) {
	// io.emit("test", { data: "hi" });
	console.log("starting to confirm, order controller");

	const order = await debtService.approveOrder(req.params.id);
	console.log("service done, order controller");

	res.json({
		order: order._id,
		user: order.user,
		status: order.status,
		confirmedAt: order.confirmedAt,
	});
};
