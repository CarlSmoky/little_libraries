const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
let firebaseAdmin;


module.exports = ({getUserByEmail}) => {
  const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

  router.post('/', (req, res) => {
    getUserByEmail(req.body.email)
      .then(user => {
        if (!user) {
          console.log("couldn't find user");
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
                });
              }


              const uid = `${user.id}`;
              admin.auth().createCustomToken(uid)
                .then(customToken => {
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
              console.log("Entry password invalid. Try again!");
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
