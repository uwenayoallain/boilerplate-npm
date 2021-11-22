require("dotenv").config();
const path = require("path");
var express = require("express");

var app = express();
const string = "Hello json";
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/index.html"))
);
app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE == "uppercase" ? string.toUpperCase() : string
  });
});
module.exports = app;
