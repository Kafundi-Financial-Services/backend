const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const dailyStatPlugin = require("./dailyStats.plugin");

let debtSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Staff",
			required: true,
		},
		name: { type: String, required: true },
		amount: { type: Number, required: true },
		status: {type: String, default: "PENDING"}
	},
	{ timestamps: true },
);

debtSchema.plugin(statPlugin);
debtSchema.plugin(dailyStatPlugin);

module.exports = mongoose.model("debts", debtSchema);
