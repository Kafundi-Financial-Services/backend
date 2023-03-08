const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const dailyStatPlugin = require("./dailyStats.plugin");

let CalculationsSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Staff",
			required: true,
		},
		
	},
	{ timestamps: true },
);

CalculationsSchema.plugin(statPlugin);
CalculationsSchema.plugin(dailyStatPlugin);

module.exports = mongoose.model("calculations", CalculationsSchema);
