const { User, Transactions, Collections, Expenses } = require("../models");
const moment = require("moment");

    const today = moment().startOf("day");
	const startOfMonth = moment().startOf('month').toDate();
	const endOfMonth = moment().endOf('month').toDate()



exports.monthly = async function (query) {
	const users = await User.countPerMonth(query);
	const transactions = await Transactions.countPerMonth(query);
	const collections = await Collections.countPerMonth(query);
	const dailyTransactions = await Transactions.countPerDay(query)

	return { users, transactions, collections, dailyTransactions };
};

exports.all = async function (query) {
	const users = await User.countDocuments(query);
	const transactions = await Transactions.countDocuments(query);
	const collections = await Collections.count({ status: "successful" });
	
	// const totalCollections = await Collections.aggregate([
	//   { $match: { status: "successful" } },
	//   { $group: { _id: "$status", cost: { $sum: "$cost" } } },
	// ]);
	const totalTransactions = await Transactions.aggregate([
		{
			$match: {
				status: "SUCCESS",
				// createdAt: {
				// 	$gte: today.toDate(),
				// 	$lte: moment(today).endOf("day").toDate(),
				// },
			},
		},
		{ $group: { _id: { status: "$status" }, amount: { $sum: "$amount" } } },
	]);

	const profit = await Transactions.aggregate([
		{ $match: { status: "SUCCESS" } },
		{ $group: { _id: { status: "$status" }, profit: { $sum: "$profit" } } },
	]);
	
	const monthlyExpenses = await Expenses.aggregate([
		{
			$match: {
				createdAt: {
					$gte: startOfMonth,
					$lte: endOfMonth,
				},
			},
		},
		{
			$group: {
				_id: {
					month: {
						$month: "$createdAt",
					},
				},
				amount: { $sum: "$amount" },
			},
		},
	]);
	
	const monthlyTransactions = await Transactions.aggregate([
		{
			$match: {
				status: "SUCCESS",
				createdAt: {
					$gte: startOfMonth,
					$lte: endOfMonth,
				},
			},
		},
		{ $group: { _id: { status: "$status" }, amount: { $sum: "$amount" } } },
	]);
	
	const dailyTransactions = await Transactions.aggregate([
		{
			$match: {
				status: "SUCCESS",
				createdAt: {
					$gte: today.toDate(),
					$lte: moment(today).endOf("day").toDate(),
				},
			},
		},
		{ $group: { _id: { status: "$status" }, amount: { $sum: "$amount" } } },
	]);
		const dailyExpenses = await Expenses.aggregate([
			{
				$match: {
					createdAt: {
						$gte: today.toDate(),
						$lte: moment(today).endOf("day").toDate(),
					},
				},
			},
			{
				$group: {
					_id: {
						day: {
							$dayOfWeek: "$createdAt",
						},
					},
					amount: { $sum: "$amount" },
				},
			},
		]);

		if(dailyExpenses.length < 1){
			dailyExpenses.push({ amount: 0})
		}

		if (monthlyExpenses.length < 1) {
			monthlyExpenses.push({ amount: 0 });
		}

		if (dailyTransactions.length < 1) {
			dailyTransactions.push({ amount: 0 });
		}

		if (monthlyTransactions.length < 1) {
			monthlyTransactions.push({ amount: 0 });
		}
	

	return { users, transactions, collections, totalTransactions, profit, dailyExpenses, monthlyExpenses, monthlyTransactions, dailyTransactions };
};
