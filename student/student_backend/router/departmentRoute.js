const express = require("express");
const router = express.Router();

const Department = require("../mongoDB/schema/departmentSchema/deptDetails");
const Semester = require("../mongoDB/schema/departmentSchema/semDetails");
const Subject = require("../mongoDB/schema/departmentSchema/subjectDetails");
const Divison = require("../mongoDB/schema/departmentSchema/divisionDetails");
const Batch = require("../mongoDB/schema/departmentSchema/batchDetails");
const DivisionYear = require("../mongoDB/schema/departmentSchema/batchYear");
//const User= require('../mongoDB/schema/authencation/user.model');
router.post("/createdepartment", (req, res) => {
  const department = req.body.dept;
  console.log(department);
  Department.create({deptName:department}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
router.post("/createsemester", (req, res) => {
  const semester = req.body;

  Semester.create({sem:semester.sem.semesterName,deptID:semester.sem.departmentId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/createsubject", (req, res) => {
  const subject = req.body;
  Subject.create({subject:subject.sub.subjectName,semID:subject.sub.semesterId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/createdivison", (req, res) => {
  const divison = req.body.divi;
  Divison.create({div:divison.divisionName,semID:divison.semesterId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
router.post("/createbatch", (req, res) => {
  const batch = req.body.bat;
  Batch.create({batch:batch.batchName,divID:batch.divisionId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


router.get("/department", (req, res) => {
  console.log("get department");
  const department = req.body;
  Department.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
router.post("/semester", (req, res) => {
  const semester = req.body;
  console.log(semester.deptid);
  Semester.find({ deptID: semester.deptid }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

router.post("/subject", (req, res) => {
  const subject = req.body;
  console.log("sub  "+subject);
  Subject.find({ semID: subject.semid }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

router.post("/divison", (req, res) => {
  const divison = req.body;
  console.log(divison.divid);
  Divison.find({ semID: divison.divid }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
router.post("/batch", (req, res) => {
  const batch = req.body;
  Batch.find({ divID: batch.batchid }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/createyear", (req, res) => {
  console.log(req.body);
  //const divisionyearobj = new divisionYear(req.body);
  const year = req.body;
  DivisionYear.create({year:year.dept}, (err, data) => {
    if (err) res.status(500);
    else res.send("done");
  });
  //console.log(Divisionyearobj);
});

router.get("/getyear", (req, res) => {
  DivisionYear.find({}, (err, data) => {
    if (err) res.status(500).send("");
    else {
      console.log(data);
      res.send(data);
    }
  });
});

module.exports = router;
