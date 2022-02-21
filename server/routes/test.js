const express = require('express');
const router = express.Router();
const verifyJWT = require('./verifyJWT');

module.exports = () => {

  router.get('/', verifyJWT, (req, res) => {
    console.log("get route, will use verifyJWT");
    res.send("Yo, u are authenticated Congrats!");
  });
  return router;
};

// router.get('/', verifyJWT, (req, res) => {
//   console.log("get route, will use verifyJWT");
//   res.send("Yo, u are authenticated Congrats!");
// });

// module.exports = router;