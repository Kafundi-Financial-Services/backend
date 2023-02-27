const Transactions = require("../models/transactions");
const { transactionService } = require("../services");
const AppError = require("../utils/AppError");
const httpStatus = require("http-status");



exports.newTransaction = async function (req, res, next) {
	// let orders = await Transactions.find(req.query).populate({
	// 	path: "user",
	// 	select: "username phone",
	// });
  console.log(req.body, 'req.boy', req.user.id, "user")
  const newT = {user: req.user.id, amount: Number(req.body.amount), profit: Number(req.body.amount) > 40 ? ((2.5/100) * Number(req.body.amount)) : 1, transactionId : req.body.transactionId }
  

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

exports.getOrders = async function (req, res, next) {
  let orders = await Transactions.find(req.query).populate({
    path: "user",
    select: "username phone",
  });
  res.json(orders);
};

exports.getOrder = async function (req, res, next) {
  let order = await Transactions.findById(req.params.id);
  res.json(order);
};

exports.update = async function (req, res) {
  let order = await Transactions.findByIdAndUpdate(
    req.params.updateId,
    {
      status: "SUCCESS",
      confirmedAt: new Date(),
    },
    (err, order) => {
      if (order) {
        res.json(order);
      }
    }
  );
  // res.json(order);
};

exports.deleteOrder = async function (req, res, next) {
  let order = await transactionService.deleteOrder(req.params.id);
  res.json(order);
};



exports.getOrders = async function (req, res) {
  let orders = await Transactions.find(req.query).populate({
    path: "user",
    select: "username phone",
  });
  res.json(orders);
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

exports.confirmDeliveryOrder = async function (req, res, next) {
  console.log("orderToApprove");
  const order = await transactionService.approveDeliveryOrder(req.params.id);

  res.json({
    order: order._id,
    user: order.user,
    status: order.status,
    confirmedAt: order.confirmedAt,
  });
};
