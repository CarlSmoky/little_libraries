const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {

  router.get('/', (req, res) => {
    res.send({ title: 'login' });

  });

  return router;
};
