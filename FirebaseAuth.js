// currently unused.  this logic lives in login.js. Probably should be from here

const admin = require('firebase-admin');
const serviceAccount = require('./little-libraries-ea3cb-firebase-adminsdk-fpx0i-c01c866eaa.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const uid = 'test-uid';
admin.auth().createCustomToken(uid)
  .then(customToken => {
    // console.log(customToken);
  })
  .catch(error => {
    console.log("couldn't create custom token", error);
  })
