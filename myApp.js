var express = require("express");
var app = express();
const string = "Hello World";
function handle(req, res) {
  res.send(string);
}
app.get("/", handle);
console.log(string);
module.exports = app;
