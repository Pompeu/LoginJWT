"use strict";

const User = require("../models/user");
const createReponse = require("./helper/response.js");

const GetOne = (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  return User.findById(id, { password: 0 })
    .then((user) => user.jwtDecode(token))
    .then((user) => isWoner(user, id))
    .then((user) => createReponse(200, user, res))
    .catch((err) => createReponse(401, err, res));
};

module.exports = GetOne;

function isWoner(user, id) {
  if (user._id === id) {
    return user;
  }
  throw new Error("do not has authorization");
}
