const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const dailyStatPlugin = require("./dailyStats.plugin")


let expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    expense: {type: String, required: true},
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

expenseSchema.plugin(statPlugin);
expenseSchema.plugin(dailyStatPlugin);



module.exports = mongoose.model("expenses", expenseSchema);
