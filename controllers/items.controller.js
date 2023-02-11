const { Items } = require("../models");
const AppError = require("../utils/AppError");
const { itemService } = require("../services");

exports.addItem = async (req, res, next) => {
  console.log(req.body, "items....");
  const item = await itemService.createItem(req.body);
  res.json(item);
};

exports.getItem = async (req, res) => {
  const items = await Items.find();
  res.json(items);
};
exports.deleteItem = async (req, res, next) => {
  let place = await itemService.deleteItem(req.params.id);
  res.json(place);
};
