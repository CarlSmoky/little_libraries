const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = ({getUserByEmail}) => {

  router.post('/', (req, res) => {
    getUserByEmail(req.body.email)
      .then(user => {
        if (!user) {
          res
            .status(401)
            .send({ message: 'This username is not registered.' });
          return;
        }

        bcrypt.compare(req.body.password, user.password)
          .then(result => {
            if (result) {
              // const id = user.id;
              // const firstName = user.first_name;
              // const lastName = user.last_name;
              const userInfo = {
                id : user.id,
                firstName : user.first_name,
                lastName : user.last_name
              };

              const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION_TIME,
              });


              res
                .status(200)
                .send({
                  message: "Login Success!",
                  auth: true,
                  token: token,
                  // id: user.id,
                  // firstName: user.first_name,
                  // lastName: user.last_name,
                  // phoneNumber: user.phone_number,
                  // email: user.email
                });
            } else {
              res
                .status(401)
                .send({ message: "Entry password invalid. Try again!" });
            }
          });
      }).catch(err => {
        console.log(err);
      });
  });

  return router;
};