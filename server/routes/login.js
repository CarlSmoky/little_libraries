const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const serviceAccount = require('../little-libraries-ea3cb-firebase-adminsdk-fpx0i-c01c866eaa.json');
let firebaseAdmin;

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
              const userInfo = {
                id : user.id,
                firstName : user.first_name,
                lastName : user.last_name
              };

              const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION_TIME,
              });

               //  Firebase token request:
              if (!firebaseAdmin) {
                firebaseAdmin = admin.initializeApp({
                  credential: admin.credential.cert(serviceAccount)
                })
              }


              const uid = `${user.id}`;
              console.log("server", uid);
              admin.auth().createCustomToken(uid)
                .then(customToken => {
                  console.log(customToken);
                  res
                    .status(200)
                    .send({
                      message: "Login Success!",
                      auth: true,
                      token: token,
                      id: user.id,
                      firstName: user.first_name,
                      lastName: user.last_name,
                      // phoneNumber: user.phone_number,
                      email: user.email,
                      firebaseToken: customToken
                    });
                })
                .catch(error => {
                  console.log("couldn't create custom token", error);
                })
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
