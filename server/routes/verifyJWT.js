// const express = require('express');
// const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    console.log("Yo, we need a token, please give it to us next time");
    res
      .status(401)
      .json("Yo, we need a token, please give it to us next time");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticate" });
      } else {
        // req.userID = decoded.id;
        req.user = decoded; //This will pass to next destination, you can use req.user
        console.log(req.user);
        next();
      }
    });
  }
};
module.exports = verifyJWT;

// const jwt = require('jsonwebtoken')
// function authenticateToken(req, res, next){
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if(token === null) return res.sendStatus(401)
  
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }

// module.exports = { authenticateToken }