'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../config/secret')();

module.exports = user => {
  let noPassUser = user.toJSON();
  delete noPassUser.password;
  return jwt.sign(noPassUser , secret,  { expiresIn : '7d' });
};
