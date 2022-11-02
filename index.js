const express = require("express");
const app = express();
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const indexRouter = require("./routes/index.routes");

// Root route
app.get("/", (req, res) => {
  res.send({ msg: "Welcome to trade demo" });
});

//Route Prefixes
app.use("/api/", indexRouter);

// Invalid URL response
app.all("*", function (req, res) {
  res.send("Invalid URL");
});

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
