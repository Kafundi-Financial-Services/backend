const { User, Transactions, Collections } = require("../models");

exports.monthly = async function (query) {
	let users = await User.countPerMonth(query);
	let transactions = await Transactions.countPerMonth(query);
	let collections = await Collections.countPerMonth(query);

	return { users, transactions, collections };
};

exports.all = async function (query) {
	let users = await User.countDocuments(query);
	let transactions = await Transactions.countDocuments(query);
	let collections = await Collections.count({ status: "successful" });
	// let totalCollections = await Collections.aggregate([
	//   { $match: { status: "successful" } },
	//   { $group: { _id: "$status", cost: { $sum: "$cost" } } },
	// ]);
	let totalTransactions = await Transactions.aggregate([
		{ $match: { status: "SUCCESS" } },
		{ $group: { _id: {status: "$status"}, amount: { $sum: "$amount" } } },
	]);
	let profit = await Transactions.aggregate([
		{ $match: { status: "SUCCESS" } },
		{ $group: { _id: { status: "$status" }, profit: { $sum: "$profit" } } },
	]);

	return { users, transactions, collections, totalTransactions, profit };
};
