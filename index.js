const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to trade demo" });
});

app.use("/trades", require("./routes/trade.routes"));

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
