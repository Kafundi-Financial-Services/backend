const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const catchAsync = require("../../utils/catchAsync");
const browseRoute = require("./browse.route");
const searchRoute = require("./search.route");
const authRoute = require("./auth.route");
const statsRoute = require("./statistics.route");
const attachmentRoute = require("./attachment.route");
// const browseRoute = require("./attachment.route");
const meRoute = require("./me.route");
const transactions = require("./transactions");
const expenses = require("./expenses");
const browseQuery = require('./browse.query')

const router = express.Router();
// router.use(catchAsync(authMiddleware.authenticate));

router.use("/auth", authRoute);
router.use("/me", meRoute);
router.use("/search", searchRoute);
router.use("/browse", browseRoute);
router.use("/statistics", statsRoute);
router.use("/transactions", transactions);
router.use("/expenses", expenses);
router.use("/browsequery", browseQuery);

module.exports = router;
