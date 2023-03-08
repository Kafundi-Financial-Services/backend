const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const dailyStatPlugin = require("./dailyStats.plugin");

let totalAmount = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Staff",
			required: true,
		},
		mtn: { type: Number, required: true },
		airtel: { type: Number, required: true },
		bunya: { type: Number, required: true },
		cash: { type: Number, required: true },
		tempcash: { type: Number, required: true },
		debts: {type: Number, required: true}
	},
	{ timestamps: true },
);

totalAmount.plugin(statPlugin);
totalAmount.plugin(dailyStatPlugin);

module.exports = mongoose.model("calculationvalues", totalAmount);
