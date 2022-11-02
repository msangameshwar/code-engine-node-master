const express = require("express");
const tradeRoutes = require("../modules/trade.routes");

const app = express();

app.use("/trades", tradeRoutes);

module.exports = app;
