const express = require("express");
const router = express.Router();
const { expensesController, authController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");
const authMiddleware = require("../../middlewares/auth");




router
  .route("/:id")
  .delete(expensesController.deleteOrder)
  // .patch(expensesController.confirmOrder);

  router.route("/").post(catchAsync(authMiddleware.authenticate),expensesController.newTransaction);

module.exports = router;
