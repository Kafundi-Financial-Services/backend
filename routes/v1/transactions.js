const express = require("express");
const router = express.Router();
const { transactionsController } = require("../../controllers");

router
  .route("/:id")
  .delete(transactionsController.deleteOrder)
  .patch(transactionsController.confirmOrder);

  router.route("/").post(transactionsController.newTransaction);

module.exports = router;
