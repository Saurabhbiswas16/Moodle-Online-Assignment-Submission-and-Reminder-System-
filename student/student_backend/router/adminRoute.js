const express = require("express");
const router = express.Router();
const User = require("../mongoDB/schema/authencation/studentSchema");
const Semester = require("../mongoDB/schema/departmentSchema/semDetails");
const Teacher = require("../mongoDB/schema/authencation/teacherSchema")
router.post('/allStudents', async (req, res, next) => {
  console.log("ello in allStudents")
  try {
      console.log(req.body)
      const result = req.body
      const mysort = { rollNo:1};
      //create new user
      User.find({semesterId: result.semester}).sort(mysort).then((data)=>{
          res.send(data)
      });


  } catch (error) {
      // it will call the error handler present in app.js
      if (error.isJoi === true) error.status = 422 //description line 1
      next(error)
  }

})
router.post('/allocateBatch', async (req, res, next) => {
  console.log("ello in allocateroll")
  try {
      console.log(req.body)
      const result = req.body
      //create new user
      User.updateOne({ _id:result.student  },
          { $set:{ divisionId:result.div,batchId:result.batch} },
          (err, info) => {
              if (err) {
                  console.log(err)
              }
              else {
                  console.log(info)
              }
          })
          
      res.send()


  } catch (error) {
      // it will call the error handler present in app.js
      if (error.isJoi === true) error.status = 422 //description line 1
      next(error)
  }

})

router.post('/allocateRollNo', async (req, res, next) => {
  console.log("ello in allocateroll")
  try {
      console.log(req.body)
      const result = req.body
      const mysort = { fname: 1,mname: 1,lname: 1 };
      var  index=0;
      //create new user
      User.find({semesterId: result.semester}).sort(mysort).then((data)=>{
        console.log(data);
          data.map((userdata,index)=>{
            console.log("index");
            console.log(index);
              User.updateOne({_id:userdata._id  },
                  { $set:{ rollNo: index+1} },
                  (err, info) => {
                      if (err) {
                          console.log(err)
                      }
                      else {
                        console.log("ind");
                          console.log(info)
                      }
                  })
                  index++;
          })
          res.send("Roll Number Allocated Successfully!!!!")
      });


  } catch (error) {
      // it will call the error handler present in app.js
      if (error.isJoi === true) error.status = 422 //description line 1
      next(error)
  }

})

router.post("/student/deleteRequest", async (req, res, next) => {
  console.log("ello in deleteRequest");
  try {
    console.log(req.body);
    const result = req.body;

    //create new user
    const user = await User.findOneAndRemove({ email: result.email });
    res.send();
  } catch (error) {
    // it will call the error handler present in app.js
    if (error.isJoi === true) error.status = 422; //description line 1
    next(error);
  }
});

router.post("/student/acceptRequest", async (req, res, next) => {
  console.log("ello in acceptRequest");
  try {
    console.log(req.body);
    const result = req.body;

    User.updateOne(
      { email: result.email },
      { $set: { verified: true } },
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
    // it will call the error handler present in app.js
    if (error.isJoi === true) error.status = 422; //description line 1
    next(error);
  }
});

router.get("/student/getRequest", async (req, res, next) => {
  console.log("hello in all request");
  try {
    User.find({ verified: false }, (err, data) => {
      res.send(data);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/teacher/deleteRequest", async (req, res, next) => {
  console.log("ello in deleteRequest");
  try {
    console.log(req.body);
    const result = req.body;

    //create new user
    const user = await Teacher.findOneAndRemove({ email: result.email });
    res.send();
  } catch (error) {
    // it will call the error handler present in app.js
    if (error.isJoi === true) error.status = 422; //description line 1
    next(error);
  }
});

router.post("/teacher/acceptRequest", async (req, res, next) => {
  console.log("ello in acceptRequest");
  try {
    console.log(req.body);
    const result = req.body;

    Teacher.updateOne(
      { email: result.email },
      { $set: { verified: true } },
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
    // it will call the error handler present in app.js
    if (error.isJoi === true) error.status = 422; //description line 1
    next(error);
  }
});

router.get("/teacher/getRequest", async (req, res, next) => {
  console.log("hello in all request");
  try {
    Teacher.find({ verified: false }, (err, data) => {
      res.send(data);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/changesemester", async (req, res) => {
  console.log("changesemester called");
  User.find({}, { semesterId: 1, _id: 1 }, (err, semesterdata) => {
    if (err) console.log(err);
    console.log(semesterdata[0].semesterId);
    semesterdata.forEach((element, index) => {
      Semester.findOne(
        { _id: semesterdata[index].semesterId },
        async (err, data) => {
          var intsemester = parseInt(data.sem);
          if (intsemester <= 8) {
            intsemester += 1;
            console.log(intsemester.toString());
            await Semester.findOne(
              { sem: intsemester.toString() },
              async (err, semesterBySemNo) => {
                console.log("new semester", semesterBySemNo);
                console.log("user id ", semesterdata[index]);
                await User.updateOne(
                  { _id: semesterdata[index]._id },
                  {
                    $set: {
                      semesterId: semesterBySemNo._id,
                    },
                  },
                  (err, data) => {
                    console.log(data);
                  }
                );
              }
            );
          }
          console.log(intsemester);
        }
      );
    });
  });
  return res.status(200).send("");
});

router.post("/login", async (req, res, next) => {
  try {
    const result = req.body;
    console.log(result);
    if (
      result.email === process.env.ADMIN &&
      result.password === process.env.ADMIN_PASS
    ) {
      res.send({ valid: true });
    } else {
      res.send({ valid: false });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/changesemester", async (req, res) => {
  console.log("changesemester called");
  User.find({}, { semesterId: 1, _id: 1 }, (err, semesterdata) => {
    if (err) console.log(err);
    console.log(semesterdata[0].semesterId);
    semesterdata.forEach((element, index) => {
      Semester.findOne(
        { _id: semesterdata[index].semesterId },
        async (err, data) => {
          var intsemester = parseInt(data.sem);
          if (intsemester <= 8) {
            intsemester += 1;
            console.log(intsemester.toString());
            await Semester.findOne(
              { sem: intsemester.toString() },
              async (err, semesterBySemNo) => {
                console.log("new semester", semesterBySemNo);
                console.log("user id ", semesterdata[index]);
                await User.updateOne(
                  { _id: semesterdata[index]._id },
                  {
                    $set: {
                      semesterId: semesterBySemNo._id,
                    },
                  },
                  (err, data) => {
                    console.log(data);
                  }
                );
              }
            );
          }
          console.log(intsemester);
        }
      );
    });
  });
  return res.status(200).send("");
});
module.exports = router;
