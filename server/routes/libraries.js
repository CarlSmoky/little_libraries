const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');


module.exports = ({
  getLibraries,
  addLibrary
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getLibraries()
      .then((libraries) => res.json(libraries))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', verifyJWT, (req, res) => {
    const { address, lat, lng } = req.body;
    addLibrary(address, lat, lng)
      .then((library) => {
        res.json({
          library,
          message: "Yo, u are authenticated Congrats!",
          auth: true,
        });
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};
