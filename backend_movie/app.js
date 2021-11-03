const express = require("express");
const path = require("path");
const { rootRouter } = require("./src/router/root.router");
var bodyParser = require("body-parser");
const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//setup cors
const cors = require("cors");
app.use(cors());
//============================= static file ==================================
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));
//============================= static file ==================================

app.get("/", (req, res) => {
  res.send("backend api movie");
});

//============================ rootRouter ====================================
app.use("/", rootRouter);
//============================ rootRouter ====================================

//============================= listen port 5577 =============================
app.listen(8856, () => {
  console.log("app run port 8856");
});
//============================= listen port 5577 =============================
