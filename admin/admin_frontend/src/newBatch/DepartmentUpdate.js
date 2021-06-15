import React, { useEffect, useState } from "react";
import axios from "../Axios";
import  './UpdateBatch.css';
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function DepartmentUpdate(props) {
    const [department, setdepartment] = useState([]);
  const [semester, setsemester] = useState([]);
  const [deptDetails, setdeptDetails] = useState({
    departmentId: "",
    semesterId: "",
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
    
    const { name, value } = event.target;

    setdeptDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
      semesterId: "",
      
    }));
    props.selectDepartmentDetails(deptDetails);

    const temp = { deptid: value };
    const req = await axios.post("/departmentDetails/semester", temp);
    setsemester(req.data);
  };
  const changeSemester=async (event) => {
    
    const { name, value } = event.target;

    setdeptDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
      
    }));
    props.selectDepartmentDetails(deptDetails);
  }

  const tempdata = () => {
    console.log("hello temp");
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
                onChange={changeSemester}
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
            <div className="submitbutton">
            {semester.length !== 0  ? (
                <Button variant="contained" onClick={tempdata}>
                Show
                </Button>
            ) : null}
            </div>
            </div>
        </>
    )
}

export default DepartmentUpdate
