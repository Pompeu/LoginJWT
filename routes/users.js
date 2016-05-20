const express    = require('express');
const router     = express.Router();
const userCreate = require('../controllers/user-create');
const userGetAll = require('../controllers/users-getall');

router
  .post('/', userCreate)
  .get('/', userGetAll)
  .get('/:skip', userGetAll)
  .get('/:limit/:skip', userGetAll);

module.exports = router;
