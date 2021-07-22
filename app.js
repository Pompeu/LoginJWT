"use strict";

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const logger = require("morgan");
const bodyParser = require("body-parser");
const secret = require("./config/secret")();

const routes = require("./routes/index");
const users = require("./routes/users");
const auth = require("./routes/user-auth");
const conn = require("./config/conn");

const app = express();

//conn.connect();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable("x-powered-by");
app.use(
  jwt({ secret }).unless({
    path: ["/", "/api/v1/auth", { url: "/api/v1/users", methods: "POST" }],
  })
);

app.use("/", routes);
app.use("/api/v1/users/", users);
app.use("/api/v1/auth/", auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
