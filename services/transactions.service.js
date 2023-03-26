const { Notify, Transactions, Delivery } = require("../models");
const AppError = require("../utils/AppError");

const authService = require("./auth.service");
const httpStatus = require("http-status");

const io = require("../utils/socket");

/**
 * A method that gets the Transactions By its ID
 *
 * @function
 * @author Koodeyo
 * @summary Get a User By ID
 * @param {Object} orderId - The Id of the order
 * @returns {null} if order was not found
 * @returns {Document} if a order was found
 */

const getOrderById = async (orderId) => {
  const order = await Transactions.findById(orderId);
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
  const order = await Transactions.findOne(orderData);
  return order;
};
const create = async (orderData, next) => {
  const transaction = await Transactions.create(orderData);
	return transaction;

	
};
const deleteOrder = async (orderId) => {
  const order = await Transactions.findByIdAndRemove(orderId);
  return order;
};

const deleteDeliveryOrder = async (orderId) => {
  const order = await Delivery.findByIdAndRemove(orderId);
  return order;
};

const approveOrder = async (orderId) => {

  const order = await Transactions.findByIdAndUpdate(orderId, {
    status: "SUCCESS",
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
