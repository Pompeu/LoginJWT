// file: models/user.js - created at 2015-11-28, 03:21
function userHandler() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var schema = null;

  schema = new Schema({
    email : {type : String, unique : true, required : true},
    password : {type : String, required : true}
  });

  return mongoose.model('User', schema);
}

module.exports = exports = userHandler();
