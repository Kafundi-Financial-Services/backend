const mongoose = require("mongoose");
const statPlugin = require("./statistics.plugin");
const io = require("../utils/socket");
const sendSms = require("../utils/client/sms");

let orderSchema = mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    transactionId: {type: String, required: true, unique: true},
    amount: { type: Number, required: true },
    status: { type: String, default: "PENDING" },
    profit: { type: Number, required: true}
  },
  { timestamps: true }
);

orderSchema.plugin(statPlugin);

// orderSchema.post("save", async function (doc) {
//   console.log(doc);

//   let user = await this.model("User").findById(doc.userId);
//   console.log(user, "user");
//   console.log("middleware");
//   console.log(doc);

//   sendSms(
//     "0702845153",
//     `New order by ${user.username}: ${user.phone}, ${doc.item}, ${doc.quantity} ${doc.address} `,
//     function (result) {}
//   );

 
// });

// orderSchema.post("findOneAndUpdate", async function (doc) {
//   console.log("middleware");
//   console.log(doc);

//   io.getIO().emit("newOrder", {
//     order: doc.order,
//     user: doc.user,
//     status: doc.status,
//     // confirmedAt: doc.createdAt,
//   });

//   let paidOrder = await this.model.findOne(this.getQuery());
//   console.log(paidOrder, "doc 1>>>>>>>>>>>>>>>>>>>>>>>>");

//   io.getIO().emit("orderPaid", paidOrder);
//   // if (doc) {
//   //   console.log(doc, "connected user orders");
//   //   let paidOrders = doc.filter(
//   //     (order) => order.payment === "successful"
//   //   );
//   //   io.emit("paidOrders", paidOrders);
//   // }

//   io.getIO().emit("updatePaidOrder", {
//     order: doc.order,
//     user: doc.user,
//     status: doc.status,
//     // confirmedAt: doc.createdAt,
//   });

//   // sendSms(
//   //   user.phone,
//   //   `${user.username}, Your Order with ref ${doc.order} has been Approved, thank you`,
//   //   function (result) {}
//   // );
// });

module.exports = mongoose.model("orders", orderSchema);
