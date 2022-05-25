const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');
const {
  getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  getUsersPosts,
  getLibrariesForUser
}) => {

  router.post('/libraries/', verifyJWT, (req, res) => {
    // From jwt
    const userId = req.user.id;
    getLibrariesForUser(userId)
      .then((data) => res.json(data))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  /* GET users listing. */
  router.post('/', (req, res) => {

    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    getUserByEmail(email)
      .then(user => {

        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists'
          });
        } else {
          return addUser(first_name, last_name, email, password)
        }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));

  })

  return router;
};