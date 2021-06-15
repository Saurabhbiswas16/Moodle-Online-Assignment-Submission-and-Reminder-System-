const express = require("express");
const router = express.Router();
const User = require("../mongoDB/schema/authencation/user.model");

router.post("/details", async (req, res, next) => {
  // console.log("hello hey s")
  try {
    console.log(req.body);
    User.findOne({ _id: req.body.id }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        console.log(data);
        const sendData = {
          fname: data.fname,
          mname: data.mname,
          lname: data.lname,
          email: data.email,
          dob: data.dob,
        };
        console.log(sendData);
        res.send(sendData);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
