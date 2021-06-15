const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  //   console.log(req.params.id + "name");
  let file = `C:/Users/saurabh biswas/Desktop/Assignment-4/teacher/teacher_frontend/public/UploadedFiles/${req.params.id}`;
  res.download(file);
});
router.get("/student/:id", (req, res) => {
  //   console.log(req.params.id + "name");
  let file = `C:/Users/saurabh biswas/Desktop/Assignment-4/student/student_frontend/public/UploadedFiles/${req.params.id}`;
  res.download(file);
});

module.exports = router;
