const mongoose = require("mongoose");
// const { model } = require('../mongodbconnection');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  teacherId: String,
  title: String,
  departmentId: String,
  semesterId: String,
  subjectId: String,
  divisionId: String,
  batchId: String,
  description: String,
  uploadedTime: Date,
  DeadLine: Date,
  GuidlineFilePath: String,
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);
module.exports = Assignment;
