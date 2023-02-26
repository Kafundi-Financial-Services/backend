const xtend = require("xtend");
const Expenses = require("../models/expenses");
const { expenseService } = require("../services");


exports.newTransaction = async function (req, res, next) {
	// let orders = await Expenses.find(req.query).populate({
	// 	path: "user",
	// 	select: "username phone",
	// });
  console.log(req.body, 'req.boy', req.user.id, "user")

  
  
  

 try {
   let expense = expenseService.create(xtend(req.body, {user: req.user.id}))
   console.log(expense, 'expense')
 	res.json(expense);
 } catch (error) {

  console.log(error, 'this is error')
  next(error)
 }
};

exports.getOrders = async function (req, res, next) {
  let orders = await Expenses.find(req.query).populate({
    path: "user",
    select: "username phone",
  });
  res.json(orders);
};

exports.getOrder = async function (req, res, next) {
  let order = await Expenses.findById(req.params.id);
  res.json(order);
};

exports.update = async function (req, res) {
  let order = await Expenses.findByIdAndUpdate(
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
  let order = await expenseService.deleteOrder(req.params.id);
  res.json(order);
};



exports.getOrders = async function (req, res) {
  let orders = await Expenses.find(req.query).populate({
    path: "user",
    select: "username phone",
  });
  res.json(orders);
};

exports.confirmOrder = async function (req, res, next) {
  // io.emit("test", { data: "hi" });
  console.log("starting to confirm, order controller");

  const order = await expenseService.approveOrder(req.params.id);
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
  const order = await expenseService.approveDeliveryOrder(req.params.id);

  res.json({
    order: order._id,
    user: order.user,
    status: order.status,
    confirmedAt: order.confirmedAt,
  });
};
