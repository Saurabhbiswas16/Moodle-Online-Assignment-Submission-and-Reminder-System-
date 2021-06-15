var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");

//parth
const morgan = require("morgan");
const User = require("./mongoDB/schema/authencation/user.model");
const Student = require("./mongoDB/schema/authencation/student.model");
const googledrive = require("./router/googledrive");
const createError = require("http-errors");
require("dotenv").config();

const { verifyAccessToken } = require("./helpers/jwt_helper");
app.use(morgan("dev"));

//routers
const AuthRoute = require("./router/auth.route");
const ProfileRoute = require("./router/profileRoute");
const DepartmentRoute = require("./router/departmentRoute");
const studentRoute = require("./router/studentRoute");
const downloadRoute = require("./router/downloadFileRoute");
const batchYearRoute = require("./router/batchYearRoute");
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



//path

app.get("/", verifyAccessToken, async (req, res, next) => {
  const user = await User.findById(req.payload.aud);
  res.send(user);
});
console.log("auth part");
app.use("/auth", AuthRoute);
app.use("/profile", ProfileRoute);
app.use("/departmentDetails", DepartmentRoute);
app.use("/student", studentRoute);
app.use("/download", downloadRoute);
app.use("/batchyear", batchYearRoute);
app.use("/googledrive", googledrive);
//end of parth


const StudentAssignment = require("./mongoDB/schema/assignment/StudentAssignment");
app.post("/add", (req, res) => {
  const temp_assignment = req.body;
  const assignment = new Assignment(temp_assignment);
  assignment.save((err, ans) => {
    if (err) {
      console.log(err);
      res.status(500).send("data not added");
    } else {
      Student.find({ batchId: assignment.batchId }, (error, data) => {
        if (err) {
          res.status(500).send(error);
        } else {
          data.forEach((emailData) => {
            newAssignmentEmail(
              emailData.email,
              `${assignment.title} is created`
            );
          });
          
          data.forEach((emailData) => {
            console.log(ans.DeadLine);
            deadlineEmail(emailData.email, ans.DeadLine, "Only 1 day left,Hurry up!!!!!");
          });

          data.forEach((batchStudents) => {
            let studentAssignmentdocument = {
              studentId: batchStudents._id,
              assignmentId: ans._id,
              isUploaded: false,
              uploadedTime: "",
              submissionFilePath: [],
              deptId: assignment.departmentId,
              semId: assignment.semesterId,
              divId: assignment.divisionId,
              batchId: assignment.batchId,
              subjectId: assignment.subjectId,
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
  console.log("branch student" + student.branch);
  Student.find({ batchId: student.branch }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
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
  Student.find({ [text1]: value1 }, (err, data) => {
    if (err) {
      console.log("error");
      res.status(500).send(err);
    } else {
      console.log("announ");
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

app.post("/personalMail", (req, res) => {
  const announcementData = req.body;
 console.log(announcementData);
  var value1 = announcementData.sendMailID.toString();
   announcement(
          announcementData.sendMailID,
          announcementData.subject,
          announcementData.email_body
        );
        res.status(200).send("Announcement send successfully");
  // Student.find({ email: value1 }, (err, data) => {
  //   if (err) {
  //     console.log("error");
  //     res.status(500).send(err);
  //   } else {
     
       
      
  //     res.status(200).send("Announcement send successfully");
  //   }
  // });
});




app.post("/subjectstatus", (req, res) => {
  const subjectData = req.body;
  console.log(subjectData);
  Assignment.find(
    { batchId: subjectData.batchId, subjectId: subjectData.subjectId },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});
app.post("/allAssignment", (req, res) => {
  const subjectData = req.body;
  console.log(subjectData);
  Assignment.find(
    { batchId: subjectData.batId, subjectId: subjectData.subjectId },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
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

app.listen(8000, function () {
  console.log(`${__dirname} hi`);
  console.log("App running on port 8000");
});
