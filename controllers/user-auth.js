'use strict';

const User = require('../models/user');
const createReponse = require('./helper/response.js');

const UserAuth = (req, res) => {
  const userBody = req.body;

  User.findOne({email : userBody.email})
    .then(user => user.comparePass(userBody.password))
    .then(user => user.jwtSign())
    .then(token => success(token, res))
    .catch(err  => createReponse(401, err, res));
};

module.exports = UserAuth;

function success (token, res) {
  res.set('Authorization', token);
  return createReponse(200, {token}, res);
}
