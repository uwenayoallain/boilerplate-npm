const path = require("path");
var express = require("express");
var app = express();
const string = "Hello Express";
app.use("/public", express.static(path.join(__dirname, "public")));
function handle(req, res) {
  return res.sendFile(path.join(__dirname, "views/index.html"));
}
app.get("/", handle);
console.log(string);
module.exports = app;
