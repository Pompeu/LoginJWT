"use strict";

const createReponse = (status, payload, res) => {
  return res.status(status).json(payload);
};

module.exports = createReponse;
