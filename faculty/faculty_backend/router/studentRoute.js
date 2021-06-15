// const express = require("express");
// const router = express.Router();
// const Student = require("../mongoDB/schema/authencation/student.model");
// const router = express.Router();

// router.get("/getstudentbyid", (req, res) => {
//   Student.find({ _id: req.body.studentid }, (err, data) => {
//     if (err) res.send(err);
//     res.send(res.data);
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../mongoDB/schema/authencation/student.model");
const StudentAssignment = require("../mongoDB/schema/assignment/StudentAssignment");
// router.post("/details", async (req, res, next) => {
//   // console.log("hello hey s")
//   try {
//     console.log(req.body);
//     User.findOne({ _id: req.body.id }, (err, data) => {
//       if (err) {
//         res.send(err);
//       } else {
//         console.log(data);
//         const sendData = {
//           fname: data.fname,
//           mname: data.mname,
//           lname: data.lname,
//           email: data.email,
//           dob: data.dob,
//         };
//         console.log(sendData);
//         res.send(sendData);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/getstudentbyid", (req, res) => {
  console.log(req.body);

  StudentAssignment.findOne(
    { studentId: req.body.studentid, assignmentId: req.body.assignmentid },
    (err, data) => {
      if (err) res.send(err);
      console.log(data);
      res.send(data);
    }
  );
});

module.exports = router;
