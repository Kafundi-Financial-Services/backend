const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const dailyStatPlugin = require("./dailyStats.plugin")


let transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    transactionId: {type: String, required: true, unique: true},
    amount: { type: Number, required: true },
    status: { type: String, default: "PENDING" },
    profit: { type: Number, required: true},
    voda: {type: Boolean, required: true}
  },
  { timestamps: true }
);

transactionSchema.plugin(statPlugin);
transactionSchema.plugin(dailyStatPlugin);


module.exports = mongoose.model("transactions", transactionSchema);
