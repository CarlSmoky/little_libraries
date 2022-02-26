const express = require('express');
const router = express.Router();


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

  router.post('/', (req, res) => {
    const {address, lat, lng} = req.body;
    addLibrary(address, lat, lng)
      .then((library) => res.json(library))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};
