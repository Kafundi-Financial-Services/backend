const { Notify, Expenses, Delivery } = require("../models");
const authService = require("./auth.service");
const io = require("../utils/socket");

/**
 * A method that gets the Expenses By its ID
 *
 * @function
 * @author Koodeyo
 * @summary Get a User By ID
 * @param {Object} orderId - The Id of the order
 * @returns {null} if order was not found
 * @returns {Document} if a order was found
 */

const getOrderById = async (orderId) => {
  const order = await Expenses.findById(orderId);
  return order;
};

/**
 * Get order with `orderData`
 *
 * @function
 * @public
 * @async
 * @author Koodeyo
 * @param {Object} orderData - User data to find with
 * @summary Get order with `orderData`
 * @returns {Document} `order` with the given `orderData`
 */
const getOrder = async (orderData) => {
  const order = await Expenses.findOne(orderData);
  return order;
};
const create = async (expenseData) => {
  console.log(expenseData, 'this is obj')
  try{
    const expense = await Expenses.create(expenseData);
		return expense;
  }catch(err){
   throw new Error(err)
  }
	
};
const deleteOrder = async (orderId) => {
  const order = await Expenses.findByIdAndRemove(orderId);
  return order;
};

const deleteDeliveryOrder = async (orderId) => {
  const order = await Delivery.findByIdAndRemove(orderId);
  return order;
};

const approveOrder = async (orderId) => {

  const order = await Expenses.findByIdAndUpdate(orderId, {
    status: "SUCCESS",
  });
  // console.log(order, "wwwwwwwwwwwwwwwwwwwwwwww");

  await Notify.create({
    user: order.userId,
    order: order._id,
    status: "SUCCESS",
  })
    .then((doc) => {
      io.getIO().emit("test", {
        order: order._id,
        user: order.user,
        status: doc.status,
        confirmedAt: doc.confirmedAt,
      });
    })
    .catch((e) => {
      console.log(e);
    });

  return order;
};

const approveDeliveryOrder = async (orderId) => {
  const order = await Delivery.findByIdAndUpdate(orderId, {
    status: "SUCCESS",
    confirmedAt: new Date(),
  });

  console.log("orderToApprove", order);
  await Notify.create({
    user: order.user,
    order: order._id,
    status: "SUCCESS",
  })
    .then((doc) => {
      io.getIO().emit("test", {
        order: order._id,
        user: order.user,
        status: doc.status,
        confirmedAt: doc.confirmedAt,
      });
    })
    .catch((e) => {
      console.log(e);
    });

  return order;
};
module.exports = {
  deleteOrder,
  approveDeliveryOrder,
  deleteDeliveryOrder,
  getOrderById,
  getOrder,
  approveOrder,
  create
};
