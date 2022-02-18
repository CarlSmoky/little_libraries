const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
              res
                .status(200)
                .send({
                  message: "Login Success!",
                  id: user.id,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  phoneNumber: user.phone_number,
                  email: user.email
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