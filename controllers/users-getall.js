'use strict';

const User = require('../models/user');
const createReponse = require('./helper/response.js');

const UserControllerGetAll = (req , res) => {

  let skip  = req.params.skip || 0;
  skip > 100 ? 100: Number(skip, 10); 

  let limit = req.params.limit || 5;
  limit > 100 ? 100 : Number(limit, 10);

  User.find({})
    .skip(skip)
    .limit(limit)
    .sort({ email: 1 })
    .then(users => createReponse(200, users, res))
    .catch(err => createReponse(400, err, res));
};

module.exports = UserControllerGetAll;
