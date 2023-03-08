const express = require("express");
const router = express.Router();
const { debtsController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");
const authMiddleware = require("../../middlewares/auth");

router
	.route("/:id")
	.delete(debtsController.deleteDebt)
	.patch(debtsController.approveDebt);

router
	.route("/")
	.post(
		catchAsync(authMiddleware.authenticate),
		catchAsync(debtsController.create),
	);

module.exports = router;
