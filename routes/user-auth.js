'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../controllers/user-auth');

router
  .post('/', auth);

module.exports = router;
