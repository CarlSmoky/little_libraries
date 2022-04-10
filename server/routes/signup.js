const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = ({ getUserByEmail, addUser }) => {

  router.post('/', (req, res) => {
    // getting data from the client
    const newUser = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    getUserByEmail(req.body.email)
      .then(user => {
        if (user) {
          res
            .status(401)
            .send({ message: 'The email is already registered' });
          // throwing an error is like a break statement
          // it will jump directly to the catch block
          throw new Error("The email is already registered, email has to be unique");
        }

        // Temp block new user creation

        // res
        //   .status(401)
        //   .send({ message: 'Sorry, we are not currently accepting new users' });
        // throw new Error("No new users");

        addUser(newUser.first_name, newUser.last_name, newUser.phone_number, newUser.email, hashedPassword)
          .then(addedUser => {
            const userInfo = {
              id : addedUser.id,
              firstName : addedUser.first_name,
              lastName : addedUser.phoneNumber
            };
            const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRATION_TIME,
            });
            res
              .status(200)
              .send({
                message: "Signed up successfully!",
                auth: true,
                token: token,
                id: addedUser.id,
                firstName: addedUser.first_name,
                lastName: addedUser.last_name,
                email: addedUser.email
              });
          }).catch(err => {
            console.log(err);
          });
      });
  });
  return router;
};
