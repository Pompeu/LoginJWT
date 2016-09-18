'use strict';

const User = require('../models/user');
const createReponse = require('./helper/response.js');

const createUser = (req , res) => {

  User.create(req.body)
    .then(user => createReponse(201, user, res))
    .catch(err => createReponse(400, err, res));

};

module.exports = createUser;
