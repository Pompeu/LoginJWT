var express = require('express');
var router = express.Router();
const userCreate = require('../controllers/user-create');
/* GET users listing. */
router
  .post('/', userCreate);

module.exports = router;
