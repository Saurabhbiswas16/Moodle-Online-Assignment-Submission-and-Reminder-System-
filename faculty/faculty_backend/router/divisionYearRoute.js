const express = require("express");
const router = express.Router();

const divisionYear = require("../mongoDB/schema/departmentSchema/batchYear");

router.post("/createyear", (req, res) => {
  console.log(req.body);
  const divisionyearobj = new divisionYear(req.body);
  const year = req.body;
  divisionYear.create(year, (err, data) => {
    if (err) res.status(500);
    else res.send(data);
  });
  console.log(divisionyearobj);
});

router.get("/getyear", (req, res) => {
  divisionYear.find({}, (err, data) => {
    if (err) res.status(500);
    else res.send(data);
  });
});

module.exports = router;
