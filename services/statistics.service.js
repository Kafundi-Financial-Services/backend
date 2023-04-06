const { User, Transactions, Expenses } = require("../models");
const moment = require("moment");

    const today = moment().startOf("day");
	const startOfMonth = moment().startOf('month').toDate();
	const endOfMonth = moment().endOf('month').toDate()

	console.log(today.toDate(), moment(today.toDate()).format('MMMM Do, h:mm a') ,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..day')
	console.log(
		moment(today).endOf("day").toDate(),
		moment(moment(today).endOf("day").toDate()).format("MMMM Do, h:mm a"),
		">>>>>>>>>>>>>>>>>>>>>>>>>>>",
	);


exports.monthly = async function (query) {
	const users = await User.countPerMonth(query);
	const transactions = await Transactions.countPerMonth(query);
	const dailyTransactions = await Transactions.countPerDay(query)

	return { users, transactions, dailyTransactions };
};

exports.all = async function (query) {
	const users = await User.countDocuments(query);
	const transactions = await Transactions.countDocuments(query);

	
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

	// const profit = await Transactions.aggregate([
	// 	{ $match: { status: "SUCCESS" } },
	// 	{ $group: { _id: { status: "$status" }, profit: { $sum: "$profit" } } },
	// ]);
	
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

	const monthlyProfits = await Transactions.aggregate([
		{
			$match: {
				createdAt: {
					$gte: startOfMonth,
					$lte: endOfMonth,
				},
				status: "SUCCESS",
			},
		},
		{
			$group: {
				_id: {
					month: {
						$month: "$createdAt",
					},
				},
				profit: { $sum: "$profit" },
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

	console.log(dailyTransactions, 'daily>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
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

		const dailyProfits = await Transactions.aggregate([
			{
				$match: {
					createdAt: {
						$gte: today.toDate(),
						$lte: moment(today).endOf("day").toDate(),
					},
					status: "SUCCESS",
				},
			},
			{
				$group: {
					_id: {
						day: {
							$dayOfWeek: "$createdAt",
						},
					},
					profit: { $sum: "$profit" },
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
				if (dailyProfits.length < 1) {
					dailyProfits.push({ profit: 0 });
				}

				if (monthlyProfits.length < 1) {
					monthlyProfits.push({ profit: 0 });
				}



		dailyProfits[0].profit -= dailyExpenses[0].amount
		monthlyProfits[0].profit -= monthlyExpenses[0].amount
	

	return { users, transactions, totalTransactions, dailyExpenses, monthlyProfits,monthlyExpenses, monthlyTransactions, dailyTransactions, dailyProfits };
};
