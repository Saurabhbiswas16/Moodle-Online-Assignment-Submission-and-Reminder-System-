const express = require("express");
const router = express.Router();
const otpSchema = require("../mongoDB/schema/authencation/otp");
const randomize = require("randomatic");
const sendMail = require("../helpers/send_mail");
const createError = require("http-errors");
const User = require("../mongoDB/schema/authencation/user.model");
const { authSchema } = require("../helpers/validation_schema");
const { signAccessToken } = require("../helpers/jwt_helper");

router.post("/register", async (req, res, next) => {
  console.log("hello in register");
  try {
    console.log(req.body);
    const result = req.body;

    //if user is already present
    const doseExist = await User.findOne({ email: result.email });
    if (doseExist) res.send("user is already registered");

    //create new user
    const user = new User(result);
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);

    res.send({ accessToken });
  } catch (error) {
    // it will call the error handler present in app.js
    if (error.isJoi === true) error.status = 422; //description line 1
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // res.send('login here')
  console.log("login part");
  console.log(req.body);
  try {
    console.log("login");
    const result = await authSchema.validateAsync(req.body);
    console.log(result);
    const user = await User.findOne({ email: result.email });
    console.log(user);
    if (!user) res.send({ loginmsg: "please register first" });

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) res.send({ loginmsg: "please check credential" });
    //   throw createError.Unauthorized("username/password is not valid");

    const accessToken = await signAccessToken(user.id);
    console.log("teacher is ", user.id);
    res.send({ accessToken, user: user.email, teacherid: user.id });
  } catch (error) {
    console.log("error");
    if (error.isJoi === true)
      return next(createError.BadRequest("invalid username/password"));
    next(error);
    // res.send("please check credential");
  }
});

router.post("/forgot", async (req, res, next) => {
  try {
    // console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send("user is not exist");
    } else {
      // console.log(user)
      otp = randomize("00000");
      otpSchema.create({ otp: otp, email: req.body.email }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      sendMail(req.body.email, otp);
      res.send();
    }
  } catch (error) {
    next(error);
  }
});

router.post("/resetPassword", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.send("user is not exist");

    const otp = await otpSchema.findOne();
    if (!otp) res.send("your otp is expire or incorrect");

    User.updateOne(
      { email: user.email },
      { $set: { password: req.body.newPassword } },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      }
    );

    res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
