require("dotenv").config();
const path = require("path");
var express = require("express");
const { urlencoded } = require("body-parser");

var app = express();
const string = "Hello json";
app.use("/public", express.static(path.join(__dirname, "public")));
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/index.html"))
);

app.route("/now").get(middleware, (req, res) => {
  res.send({
    time: req.time,
  });
});

app.get("/name", (req, res) => {
  const { first, last } = req.query;
  if ((first || last) === undefined) {
    return res.status(400).json({
      Error: "Please enter both first and last name",
    });
  }
  res.json({ name: first + " " + last });
});

app.post("/name", (req, res) => {
  const { first, last } = req.body;
  if ((first || last) === undefined) {
    return res.status(400).json({
      Error: "Please enter both first and last name",
    });
  }
  res.json({ name: first + " " + last }).status(200);
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

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
