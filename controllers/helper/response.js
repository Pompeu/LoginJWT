'use strict';

const createReponse = (status, payload, res) => 
  res.status(status).json(payload);

module.exports = createReponse;
