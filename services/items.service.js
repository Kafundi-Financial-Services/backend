const { Items } = require("../models");

const createItem = async (placeData) => {
  console.log(placeData, "service");
  return await Items.create(placeData);
  // if (placeData.id) {
  //   return await Items.updateOne({ _id: placeData.id }, placeData);
  // } else {
  //   return await Items.create(placeData);
  // }
};

const deleteItem = async (itemId) => {
  const place = await Items.findOneAndDelete({ _id: itemId });
  // const place = await Items.remove({ _id: itemId });
  return place;
};

module.exports = {
  deleteItem,
  createItem,
};
