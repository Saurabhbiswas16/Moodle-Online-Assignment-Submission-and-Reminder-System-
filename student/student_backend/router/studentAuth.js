const express = require("express");
const router = express.Router();
const otpSchema = require("../mongoDB/schema/authencation/otp");
const randomize = require("randomatic");
const sendMail = require("../helpers/send_mail");
const createError = require("http-errors");
const User = require("../mongoDB/schema/authencation/studentSchema");
const { authSchema } = require("../helpers/validation_schema");
const { signAccessToken } = require("../helpers/jwt_helper");

router.post("/register", async (req, res, next) => {
  console.log("ello in student register");
  try {
    console.log(req.body);
    const result = req.body;

    //if user is already present
    const doseExist = await User.findOne({ email: result.email });
    // if (doseExist) throw createError.Conflict(`${result.email} is already registered`)
    if (doseExist) {
      res.send({ doseExist: true });
    } else {
      //create new user
      const user = new User(result);
      const savedUser = await user.save();

      const accessToken = await signAccessToken(savedUser.id);

      res.send({ accessToken });
    }
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
    // if (!user) throw createError.NotFound('User doesn\'t register')
    if (!user) {
      res.send({ registered: false });
    } else {
      if (!user.verified) {
        res.send({ verified: false, registered: true });
      } else {
        const isMatch = await user.isValidPassword(result.password);
        // if (!isMatch) throw createError.Unauthorized('username/password is not valid')
        if (!isMatch) {
          res.send({ valid: false, verified: true, registered: true });
        } else {
          const accessToken = await signAccessToken(user.id);
          console.log(user._id);
          res.send({ accessToken, user: user.email, studentId: user._id });
        }
      }
    }
  } catch (error) {
    console.log("error");
    if (error.isJoi === true)
      return next(createError.BadRequest("invalid username/password"));
    next(error);
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

router.post("/getstudentdetails", async (req, res) => {
  User.findOne({ _id: req.body.studentId }, (err, data) => {
    console.log(data);
    res.send(data);
  });
});
module.exports = router;
