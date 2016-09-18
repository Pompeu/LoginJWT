var express = require('express');
var router = express.Router();
const auth = require('../controllers/user-auth');

router
  .post('/', auth);

module.exports = router;
