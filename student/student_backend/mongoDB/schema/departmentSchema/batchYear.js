const mongoose = require("mongoose");

const batchYearSchema = mongoose.Schema({
  year: String,
});

const batchYear = mongoose.model("batchyear", batchYearSchema);
module.exports = batchYear;
