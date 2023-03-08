const express = require("express");
const router = express.Router();
const { tempCashController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");
const authMiddleware = require("../../middlewares/auth");

router
	.route("/:id")
	.delete(tempCashController.deleteTempcash)
	.patch(tempCashController.confirmTempcash);

router
	.route("/")
	.post(
		catchAsync(authMiddleware.authenticate),
		catchAsync(tempCashController.newTransaction),
	);

module.exports = router;
