var express = require('express');
var router = express.Router();
const user = require('../controllers/user-create');
/* GET users listing. */
router
  .post('/', user.create);

module.exports = router;
