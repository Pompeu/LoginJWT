var express = require('express');
var router = express.Router();
const auth = require('../controllers/user-auth');
/* GET users listing. */
router
  .post('/', auth);

module.exports = router;
