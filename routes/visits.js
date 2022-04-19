const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');

module.exports = ({
  getVisitCountByLibrary,
  recordVisit,
  getCountVisit
}) => {
  // When user is not logged in.
  router.get('/library/:libraryId/', (req, res) => {
    // const libraryId = req.query.libraryId;
    const libraryId = req.params.libraryId;
    console.log(libraryId);
    getVisitCountByLibrary(libraryId)
      .then((count) => res.json(count))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  //When user is logged in.
  router.post('/library/', verifyJWT, (req, res) => {
    const { libraryId } = req.body;
    getCountVisit(req.user.id, libraryId)
      .then((count) => res.json(count))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', verifyJWT, (req, res) => {
    const { libraryId } = req.body;
    const userId = req.user.id;
    recordVisit(userId, libraryId)
      .then((counts) => res.json(counts))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};