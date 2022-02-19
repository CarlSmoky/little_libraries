const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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

        addUser(newUser.first_name, newUser.last_name, newUser.phone_number, newUser.email, hashedPassword)
          .then(addedUser => {
            res
              .status(200)
              .send({
                message: "Signed up successfully!",
                id: addedUser.id,
                firstName: addedUser.first_name,
                lastName: addedUser.last_name,
                phoneNumber: addedUser.phoneNumber,
                email: addedUser.email
              });
          }).catch(err => {
            console.log(err);
          });
      });
  });
  return router;
};