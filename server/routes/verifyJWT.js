// const express = require('express');
// const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res
      .status(401)
      .json("Yo, we need a token, please give it to us next time");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticate" });
      } else {
        req.userID = decoded.id;
        console.log(req.userID);
        next();
      }
    });
  }
};
module.exports = verifyJWT;

