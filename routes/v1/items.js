const express = require("express");
const router = express.Router();
const { itemsController } = require("../../controllers");

router
  .route("/")
  .post(itemsController.addItem)
  .get(itemsController.getItem)
  .patch(itemsController.addItem);

router.route("/:id").delete(itemsController.deleteItem);

module.exports = router;
