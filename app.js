var express = require("express");
var path = require("path");
var logger = require("morgan");

const designersRouter = require("./src/resources/designers/router");
const eventsRouter = require("./src/resources/events/router");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/designers", designersRouter);
app.use("/events", eventsRouter);

app.all("*", (req, res) => {
  res.status(404).json({ msg: "You are at the wrong place!!!" });
});

module.exports = app;
