const User = require('../models/user');


const UserController = (req , res) => {
  User.create(req.body)
    .then(user => success(201, user, res),
          err  => error(400, err, res))
    .catch(err => error(400, err, res));
};

function success (status, user, res) {
  return res.status(status).json(user);
}

function error (status , err, res) {
  return res.status(status).json(err);
}

module.exports = UserController;
