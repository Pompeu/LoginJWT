// file: models/user.js - created at 2015-11-28, 03:21
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const secret = require("../config/secret")();

const salt = bcrypt.genSaltSync(8);
const encript = (pass) => bcrypt.hashSync(pass, salt);

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, set: encript },
});

schema.methods.comparePass = function (bodyPassword) {
  const that = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(bodyPassword, this.password, (err, res) => {
      res && !err
        ? resolve(that)
        : reject(err || { error: "password is dont match" });
    });
  });
};

schema.methods.jwtSign = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    let noPassUser = that.toJSON();
    delete noPassUser.password;
    jwt.sign(noPassUser, secret, { expiresIn: "7d" }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
};

schema.methods.jwtDecode = function (jwtToken) {
  return new Promise((resolve, reject) => {
    return jwt.verify(jwtToken, secret, (err, decoded) => {
      err ? reject(err) : resolve(decoded);
    });
  });
};

module.exports = mongoose.model("User", schema);
