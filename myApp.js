require("dotenv").config();
const path = require("path");
var express = require("express");

var app = express();
const string = "Hello json";
app.use("/public", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/index.html"))
);
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: string.toUpperCase() });
  } else {
    res.json({ message: string });
  }
  //   res.json({
  //     message:
  //       process.env.MESSAGE_STYLE == "uppercase" ? string.toUpperCase() : string
  //   });
});
module.exports = app;
