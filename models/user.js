// file: models/user.js - created at 2015-11-28, 03:21
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salt = bcrypt.genSaltSync(12);
const encript = pass => bcrypt.hashSync(pass, salt);

const schema = new Schema({
  email    : { type : String, unique : true, required : true },
  password : { type : String, required : true, set : encript }
});

schema.statics.comparePass = (inpass, comparePass) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(inpass, comparePass, (err, res) => {
      res ? resolve(res) : reject(res);
    });
  });

module.exports = mongoose.model('User', schema);
