const express = require("express");
const router = express.Router();
const { calculationsController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");
const authMiddleware = require("../../middlewares/auth");

router
	.route("/:id")
	.delete(calculationsController.deleteOrder)
	.patch(calculationsController.confirmOrder);

router
	.route("/")
	.post(
		catchAsync(authMiddleware.authenticate),
		catchAsync(calculationsController.calculate),
	);

module.exports = router;
