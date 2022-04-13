const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');

module.exports = ({
  getVisitCountByLibrary,
  recordVisit
}) => {
  /* GET visit count. */
  router.get('/', (req, res) => {
    const libraryId = req.query.libraryId;
    getVisitCountByLibrary(libraryId)
      .then((count) => res.json(count))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', verifyJWT, (req, res) => {
    const { libraryId } = req.body;
    const userId = req.user.id;
    recordVisit(userId, libraryId)
      .then((count) => res.json(count))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};