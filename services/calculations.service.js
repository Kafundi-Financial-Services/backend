const { Calculations, TotalAmount } = require("../models");
const { getDebtsTotal, getPaidDebts } = require("./debts.service");
const { getRefundedCash, getTempCash } = require("./tempcash.service");
const xtend = require('xtend')






/**
 * A method that gets the TotalAmount By its ID
 *
 * @function
 * @author Koodeyo
 * @summary Get a User By ID
 * @param {Object} orderId - The Id of the order
 * @returns {null} if order was not found
 * @returns {Document} if a order was found
 */

const getOrderById = async (orderId) => {
  const order = await TotalAmount.findById(orderId);
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
  const order = await TotalAmount.findOne(orderData);
  return order;
};

/*
 * 
 * @param {
  mtn: 5000,
  airtel: 5000,
  bunya: 5000,
  cash: 5000,
  user: '63fcbc89cc0b6885f7c5c207'
} orderData 
 * @returns 
 */

const create = async (orderData) => {
  console.log(orderData, 'cals');

  const tempcash = await getTempCash()
  const debts = await getDebtsTotal()
  const paidDebts = await getPaidDebts()

  console.log(debts, 'am debt')

  const calValues = await TotalAmount.create(xtend(orderData, {tempcash, debts}))
  
  .then(({_doc})=>{
    let {tempcash, debts, mtn, airtel, cash, bunya} = _doc

    let result = tempcash + mtn + airtel + cash + bunya + paidDebts

    console.log(result, 'this is my result')
    return xtend(_doc, {result})

  })
  

  console.log(calValues, 'cal values')
  
  return calValues

	
};
const deleteOrder = async (orderId) => {
  const order = await TotalAmount.findByIdAndRemove(orderId);
  return order;
};

const deleteDeliveryOrder = async (orderId) => {
  const order = await Delivery.findByIdAndRemove(orderId);
  return order;
};

const approveOrder = async (orderId) => {

  const order = await TotalAmount.findByIdAndUpdate(orderId, {
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
