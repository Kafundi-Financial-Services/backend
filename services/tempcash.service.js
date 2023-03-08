const { TempCash } = require("../models");
const moment = require("moment");

const today = moment().startOf("day");
const startOfMonth = moment().startOf("month").toDate();
const endOfMonth = moment().endOf("month").toDate();

const getTempcashById = async (orderId) => {
  const tempcash = await TempCash.findById(orderId);
  return tempcash;
};


// const getTempcash = async (orderData) => {
//   const tempcash = await TempCash.findOne(orderData);
//   return tempcash;
// };
const create = async (orderData, next) => {
  const tempcash = await TempCash.create(orderData);
	return tempcash;
	
};
const deleteTempcash = async (orderId) => {
  const tempcash = await TempCash.findByIdAndRemove(orderId);
  return tempcash;
};

const approveTempcash = async (orderId) => {

  const tempcash = await TempCash.findByIdAndUpdate(orderId, {
    status: "SUCCESS",
  });

  return tempcash;
};

const getTempCash = async () => {
	const tempcash = await TempCash.aggregate([
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
				tempcash: { $sum: "$amount" },
			},
		},
	]);

  if(tempcash.length) return tempcash[0].tempcash;

  return 0;
};


module.exports = {
  deleteTempcash,
  getTempCash,
  getTempcashById,
  // getTempcash,
  approveTempcash,
  create
};
