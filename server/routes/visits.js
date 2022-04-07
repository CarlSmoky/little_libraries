const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');
const {
  getVisitCountByLibrary,
  getVisitCountByUser,
  recordVisit
} = require('../helpers/dataHelpers');

module.exports = ({
  getVisitCountByLibrary,
  getVisitCountByUser,
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

  router.post('/', (req, res) => {
    const { userId, libraryId } = req.body;
    // console.log("HERE ->", req.user.id);
    recordVisit(userId, libraryId)
      .then((count) => res.json(count))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};