// currently unused.  this logic lives in login.js. Probably should be from here

const admin = require('firebase-admin');
// const serviceAccount = require('./little-libraries-ea3cb-firebase-adminsdk-fpx0i-c01c866eaa.json');


const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": process.env.FIREBASE_client_x509_cert_url
// }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const uid = 'test-uid';
admin.auth().createCustomToken(uid)
  .then(customToken => {
    console.log(customToken);
  })
  .catch(error => {
    console.log("couldn't create custom token", error);
  })
