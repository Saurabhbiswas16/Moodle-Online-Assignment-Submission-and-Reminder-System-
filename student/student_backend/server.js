var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
var PORT = 8001;
// console.log(PORT);

//parth
const morgan = require("morgan");
const User = require("./mongoDB/schema/authencation/user.model");
const googledrive = require("./router/googledrive");
const createError = require("http-errors");
require("dotenv").config();

const { verifyAccessToken } = require("./helpers/jwt_helper");
app.use(morgan("dev"));

//routers
const AuthRoute = require("./router/auth.route");
const AdminRoute = require("./router/adminRoute");
const ProfileRoute = require("./router/profileRoute");
const DepartmentRoute = require("./router/departmentRoute");
const StudentAuthRoute = require("./router/studentAuth");

//end od parth

var db = require("./mongoDB/connection/mongoDb");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Assignment = require("./mongoDB/schema/assignment/assignment");
const newAssignmentEmail = require("./emailServer/newAssignmentEmail");
const deadlineEmail = require("./emailServer/deadlineEmail");
const announcement = require("./emailServer/announcement");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../student_frontend/public/UploadedFiles");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// var upload = multer({ storage: storage }).single("file");

//path

app.get("/", verifyAccessToken, async (req, res, next) => {
  const user = await User.findById(req.payload.aud);
  res.send(user);
});
console.log("auth part");
app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
app.use("/profile", ProfileRoute);
app.use("/departmentDetails", DepartmentRoute);
app.use("/student", StudentAuthRoute);
app.use("/googledrive", googledrive);
//end of parth

// app.post("/upload", function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.log(err);
//       return res.status(500).json(err);
//     } else if (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });
const StudentAssignment = require("./mongoDB/schema/assignment/StudentAssignment");
app.post("/add", (req, res) => {
  const temp_assignment = req.body.assignment;
  const assignment = new Assignment(temp_assignment);
  assignment.save((err, ans) => {
    if (err) {
      console.log(err);
      res.status(500).send("data not added");
    } else {
      User.find({ batchId: assignment.batchId }, (error, data) => {
        if (err) {
          res.status(500).send(error);
        } else {
          data.forEach((emailData) => {
            newAssignmentEmail(emailData.email, "testing email");
          });
          data.forEach((emailData) => {
            deadlineEmail(emailData.email, emailData.DeadLine, "testing email");
          });

          data.forEach((batchStudents) => {
            let studentAssignmentdocument = {
              studentId: batchStudents._id,
              assignmentId: ans._id,
              isUploaded: false,
              uploadedTime: "",
              submissionFilePath: "",
              deptId: assignment.departmentId,
              semId: assignment.semesterId,
              divId: assignment.divisionId,
              batchId: assignment.batchId,
            };
            let SAssignment = new StudentAssignment(studentAssignmentdocument);
            console.log(SAssignment);

            console.log("now create studentassignment");
            SAssignment.save((err, data) => {
              if (err) console.log("error in creating student assignment");
              console.log("student Assgnment created successfully");
            });
          });
        }
      });
      res.send("Assignment created successfully");
    }
  });
});
app.post("/studentStatus", (req, res) => {
  const student = req.body;
  console.log(student.assignId);
  StudentAssignment.find({ assignmentId: student.assignId }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
app.post("/branchStudent", (req, res) => {
  const student = req.body;
  console.log(student.branch);
  User.find({ batchId: student.branch }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

const Announcement = require("./mongoDB/schema/announcement/announcement");

app.post("/announcement", (req, res) => {
  const announcementData = req.body;
  Announcement.create(announcementData, (err, data) => {
    if (err) {
      res.send(err);
    } else {
    }
  });

  var text1 = announcementData.sendMailName;
  var value1 = announcementData.sendMailID.toString();
  User.find({ [text1]: value1 }, (err, data) => {
    if (err) {
      console.log("error");
      res.status(500).send(err);
    } else {
      console.log(data);
      data.forEach((emailData) => {
        console.log(emailData);
        announcement(
          emailData.email,
          announcementData.subject,
          announcementData.email_body
        );
      });
      res.status(200).send("Announcement send successfully");
    }
  });
});

app.post("/allannouncement", (req, res) => {
  const announcementData = req.body;
  var text1 = announcementData.sendMailName;
  var value1 = announcementData.sendMailID;
  console.log(value1);
  Announcement.find({ sendMailID: value1 }, (err, data) => {
    if (err) {
      console.log("error");
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/subjectstatus", (req, res) => {
  const subjectData = req.body;
  console.log(subjectData.subId);
  Assignment.find({ batchId: subjectData.subId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/allAssignment", (req, res) => {
  const subjectData = req.body;
  console.log(subjectData.batId);
  Assignment.find({ batchId: subjectData.batId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// app.use(async(req,res,next)=>{
//     next(createError.NotFound())
// })
// //error handler generated from above
// app.use((err,req,res,next) => {
//   console.log("hello here")
//   res.status(err.status || 500 )
//   res.send({
//       error: {
//           status: err.status || 500,
//           message: err.message
//       }
//   })
// })
app.post("/getstudentassignments", (req, res) => {
  (async () => {
    console.log("in server getstudentAssignment");
    console.log(req.body);
    var subjectbatch = req.body.subjectbatch;
    // console.log()
    var sa;
    StudentAssignment.find(
      {
        subjectId: req.body.subjectId,
        // batchId: subjectbatch.batchId,
        studentId: req.body.studentid,
      },
      { assignmentId: 1 },
      (err, data) => {
        sa = data;
        var ass = [];
        console.log(sa);
        var i = sa.length;
        if (i == 0) res.status(200).send([]);
        console.log(i);
        var j = 0;
        sa.forEach((elem) => {
          Assignment.findOne({ _id: elem.assignmentId }, (err, data) => {
            // console.log("assignment data" + data);
            ass.push(data);
            j++;
            if (i == j) {
              console.log("assignment" + ass);
              res.status(200).send(ass);
            }
            // console.log(ass);
          });
        });
      }
    );
  })();
});

app.post("/getassignment", (req, res) => {
  var assignmentid = req.body.assignmentid;
  console.log(assignmentid);
  Assignment.findOne({ _id: assignmentid }, (err, data) => {
    if (err) return res.status(500).send(err);
    console.log(data);
    return res.status(200).send(data);
  });
});

app.post("/setassignment", (req, res) => {
  console.log("hello in setassignment");
  console.log(req.body);
  let UploadedAssignment = req.body.assignment;
  let assignment = new StudentAssignment(UploadedAssignment);
  // StudentAssignment.updateOne({studentId:UploadedAssignment.studentId , assignmentId : UploadedAssignment.studentId},{$set :{isUploaded:true}});
  StudentAssignment.updateOne(
    {
      studentId: UploadedAssignment.studentId,
      assignmentId: UploadedAssignment.assignmentId,
    },
    {
      $set: {
        isUploaded: true,
        uploadedTime: Date.now(),
        submissionFilePath: UploadedAssignment.submissionFilePath,
      },
    },
    function (err, data) {
      if (err) console.log("error in student assignment update");
      console.log(data);
      console.log("student assignment updated");
      res.status(200).send("student assignment updated");
    }
  );

  // assignment.save(function(err,ans){
  //   if(err){
  //     console.log(err)
  //     return res.status(500).send("data not added")
  //   }else{
  //     console.log(ans)
  //     return res.status(200).send("data added successfully");
  //   }
  // })
});

app.listen(8001, function () {
  console.log("App running on port " + PORT);
});
