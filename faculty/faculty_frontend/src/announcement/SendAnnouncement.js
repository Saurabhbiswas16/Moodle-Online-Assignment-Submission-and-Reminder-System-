import React, { useEffect, useState } from "react";
import axios from "../Axios";
import "../Teacher/DepartmentDetails.css";
import {
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SendAnnouncement(props) {
  const [department, setdepartment] = useState([]);
  const [semester, setsemester] = useState([]);
  const [division, setdivision] = useState([]);
  const [batch, setbatch] = useState([]);
  const [currentbatch, setcurrentbatch] = useState("");

  const [deptDetails, setdeptDetails] = useState({
    departmentId: "",
    semesterId: "",
    divisionId: "",
    batchId: "",
     
  });
  useEffect(() => {
    async function fetchDepartmentDetails() {
      const req = await axios.get("/departmentDetails/department");
      console.log(req.data);
      setdepartment(req.data);
    }
    fetchDepartmentDetails();
  }, []);

  const callSemester = async (event) => {
    setbatch([]);
    setdivision([]);
    setcurrentbatch("");

    const { name, value } = event.target;

    setdeptDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
      semesterId: "",
      divisionId: "",
      batchId: "",
       
      
    }));
    props.selectDepartmentDetails({});

    const temp = { deptid: value };
    const req = await axios.post("/departmentDetails/semester", temp);
    setsemester(req.data);
  };
  const callDivision = async (event) => {
    setbatch([]);
    const { name, value } = event.target;
    setdeptDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
      divisionId: "",
      batchId: "",
       
    }));

    const temp = { divid: value };
    const req = await axios.post("/departmentDetails/divison", temp);
    setdivision(req.data);
  };
  const callBatch = async (event) => {
    setcurrentbatch("");
    const { name, value } = event.target;
    setdeptDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
      batchId: "",
       
    }));
    props.selectDepartmentDetails({});
    const temp = { batchid: value };
    const req = await axios.post("/departmentDetails/batch", temp);
    setbatch(req.data);
    console.log(batch);
  };

  const changedBatch = (event) => {
    const { name, value } = event.target;
    setdeptDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
      
    }));
    props.selectDepartmentDetails({});
    setcurrentbatch(value);
    console.log(currentbatch);
  };

  const tempdata = () => { 
    props.selectDepartmentDetails(deptDetails);
  };
  const classes = useStyles();
  return (
    <>
      <div className="DepartmentHeader">
        <div className="form-group">
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              onChange={callSemester}
              className={classes.selectEmpty}
              name="departmentId"
            >
              {department.map((data, index) => (
                <MenuItem value={data._id}>{data.deptName}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Department</FormHelperText>
          </FormControl>
        </div>

        <div className="form-group">
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Semester
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              onChange={callDivision}
              className={classes.selectEmpty}
              name="semesterId"
            >
              {semester.map((data, index) => (
                <MenuItem value={data._id}>{data.sem}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Semester</FormHelperText>
          </FormControl>
        </div>

        {division.length !== 0 ? (
          <>
            <div className="form-group">
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  Division
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  onChange={callBatch}
                  className={classes.selectEmpty}
                  name="divisionId"
                >
                  {division.map((data, index) => (
                    <MenuItem value={data._id}>{data.div}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select Division</FormHelperText>
              </FormControl>
            </div>
          </>
        ) : null}
        {batch.length !== 0 ? (
          <>
            <div className="form-group">
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  Batch
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  onChange={changedBatch}
                  className={classes.selectEmpty}
                  name="batchId"
                >
                  {batch.map((data, index) => (
                    <MenuItem value={data._id}>{data.batch}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select Batch</FormHelperText>
              </FormControl>
            </div>
          </>
        ) : null}
        <div className="submitbutton">
          {department.length !== 0 ? (
            <Button variant="contained" className="highlighted" onClick={tempdata}>
              Show
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SendAnnouncement;
