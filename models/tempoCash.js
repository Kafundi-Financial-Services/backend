const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const dailyStatPlugin = require("./dailyStats.plugin");

let tempCashSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Staff",
			required: true,
		},
		name: { type: String, required: true},
		amount: { type: Number, required: true },
		status: { type: String, default: "PENDING" },
		voda: { type: Boolean, required: true },
	},
	{ timestamps: true },
);

// tempCashSchema.plugin(statPlugin);
// tempCashSchema.plugin(dailyStatPlugin);

module.exports = mongoose.model("temporarycash", tempCashSchema);
