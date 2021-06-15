const express = require('express')
const router = express.Router();

const Department = require('../mongoDB/schema/departmentSchema/deptDetails')
const Semester=require('../mongoDB/schema/departmentSchema/semDetails');
const Subject = require('../mongoDB/schema/departmentSchema/subjectDetails');
const Divison=require('../mongoDB/schema/departmentSchema/divisionDetails');
const Batch = require('../mongoDB/schema/departmentSchema/batchDetails');
//const User= require('../mongoDB/schema/authencation/user.model');
router.post('/createdepartment',(req,res)=>{
  const department= req.body;
   Department.create(department,(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})
router.post('/createsemester',(req,res)=>{
  const semester=req.body;
 
  Semester.create(semester,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  }) 

})


router.post('/createsubject',(req,res)=>{
  const subject= req.body;
  console.log(subject);
  sub = new Subject(subject);
  console.log(sub);
  Subject.create(subject,(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})

router.post('/createdivison',(req,res)=>{
  const divison= req.body;
  Divison.create(divison,(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})
router.post('/createbatch',(req,res)=>{
  const batch= req.body;
  Batch.create(batch,(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})




router.get('/department',(req,res)=>{

  const department= req.body;
   Department.find((err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})
router.post('/semester',(req,res)=>{
  const semester=req.body;
 console.log(semester.deptid);
  Semester.find({deptID : semester.deptid},(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  }) 

})


router.post('/subject',(req,res)=>{
  const subject= req.body;
  Subject.find({semID:subject.semid},(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})

router.post('/divison',(req,res)=>{
  const divison= req.body;
  Divison.find({semID:divison.divid},(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})
router.post('/batch',(req,res)=>{
  const batch= req.body;
  Batch.find({divID:batch.batchid},(err,data)=>{
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.send(data);
     }
   }) 
})

module.exports = router