const User = require('../models/user');

const UserControllerGetAll = (req , res) => {
  const skip  = req.params.skip || 0;
  const limit = req.params.limit || 5;

  User.find({})
    .skip(Number(skip,10))
    .limit(Number(limit,10))
    .sort({ email : 1 })
    .exec()
    .then(users => success(200, users, res),
          err  => error(400, err, res))
    .catch(err => error(400, err, res));
};

function success (status, users, res) {
  res.status(status).json(users);
}

function error (status , err, res) {
  res.status(status).json(err);
}

module.exports = UserControllerGetAll;
