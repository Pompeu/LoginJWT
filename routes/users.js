'use strict';

const express    = require('express');
const router     = express.Router();
const userCreate = require('../controllers/user-create');
const userGet = require('../controllers/users-getall');

router
  .post('/', userCreate)
  .get('/:id', userGet);

module.exports = router;
