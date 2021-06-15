const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentAssignment = new Schema({
  studentId: String,
  assignmentId: String,
  isUploaded: Boolean,
  uploadedTime: Date,
  submissionFilePath: String,
  deptId: String,
  semId: String,
  divId: String,
  batchId: String,
  subjectId: String,
});

const StudentAssignmentSchema = mongoose.model(
  "StudentAssignment",
  StudentAssignment
);
module.exports = StudentAssignmentSchema;
