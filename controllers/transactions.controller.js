const Transactions = require("../models/transactions");
const { transactionService } = require("../services");
const AppError = require("../utils/AppError");
const httpStatus = require("http-status");



exports.newTransaction = async function (req, res, next) {
  console.log(req.body, 'req.boy', req.user.id, "user")
  const newT = {user: req.user.id, amount: Number(req.body.amount), profit: Number(req.body.amount) > 40 ? ((2.5/100) * Number(req.body.amount)) : 1, transactionId : req.body.transactionId, voda: req.body.voda }
  

 try {
   let transaction = transactionService.create(newT)
   console.log(transaction, 'transaction')
 	res.json(transaction);
 } catch (error) {

  console.log(error, 'this is error')
  next(
      new AppError(
        "Session expired! Please log out, then log in again!",
        httpStatus.UNAUTHORIZED
      ))
 }
};



exports.deleteOrder = async function (req, res, next) {
  let order = await transactionService.deleteOrder(req.params.id);
  res.json(order);
};





exports.confirmOrder = async function (req, res, next) {
  // io.emit("test", { data: "hi" });
  console.log("starting to confirm, order controller");

  const order = await transactionService.approveOrder(req.params.id);
  console.log("service done, order controller");

  res.json({
    order: order._id,
    user: order.user,
    status: order.status,
    confirmedAt: order.confirmedAt,
  });
};
