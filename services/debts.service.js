const { Debts } = require("../models");




const create = async (debtData) => {
  const debt = await Debts.create(debtData);
  return debt;
};
const getDebtById = async (orderId) => {
  const order = await Debts.findById(orderId);
  return order;
};


const getDebt = async (orderData) => {
  const order = await Debts.findOne(orderData);
  return order;
};
const deleteDebt = async (orderId) => {
  const order = await Debts.findByIdAndRemove(orderId);
  return order;
};

const deleteDeliveryDebt = async (orderId) => {
  const order = await Delivery.findByIdAndRemove(orderId);
  return order;
};

const approveDebt = async (orderId) => {

  const order = await Debts.findByIdAndUpdate(orderId, {
    status: "SUCCESS",
  });
  return order;
};
const getDebtsTotal = async () => {
	const debts = await Debts.aggregate([
		{
			$match: {
				status: "PENDING",
			},
		},
		{
			$group: {
				_id: {
					year: {
						$year: "$createdAt",
					},
				},
				debts: { $sum: "$amount" },
			},
		},
	]);

	if (debts.length) return debts[0].debts;

	return 0;
};


module.exports = {
  deleteDebt,
  getDebtsTotal,
  deleteDeliveryDebt,
  getDebtById,
  getDebt,
  approveDebt,
  create
};
