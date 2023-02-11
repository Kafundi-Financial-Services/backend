const express = require("express");
const router = express.Router();
const { transactionsController, authController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");
const authMiddleware = require("../../middlewares/auth");




router
  .route("/:id")
  .delete(transactionsController.deleteOrder)
  .patch(transactionsController.confirmOrder);

  router.route("/").post(catchAsync(authMiddleware.authenticate),transactionsController.newTransaction);

module.exports = router;
