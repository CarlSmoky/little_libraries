const express = require('express');
const router = express.Router();


module.exports = ({
  getLibraries
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getLibraries()
      .then((libraries) => res.json(libraries))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};
