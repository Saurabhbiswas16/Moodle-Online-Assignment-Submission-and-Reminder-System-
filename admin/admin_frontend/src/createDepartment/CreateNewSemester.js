import React, { useEffect, useState } from "react";
import axios from "../Axios";
import './CreateNew.css';
import {
    TextField,
    makeStyles,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
  } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
  
  
function CreateNewSemester() {
    const [department, setdepartment] = useState([]);
    const [semesterDetails, setsemesterDetails] = useState({
        departmentId: "",
        semesterName:"",
    })
    const [dataSent, setdataSent] = useState(false);
    
    useEffect(() => {
        async function fetchDepartmentDetails() {
          const req = await axios.get("/departmentDetails/department");
          console.log(req.data);
          setdepartment(req.data);
        }
        fetchDepartmentDetails();
      }, []);
    const createSemester = async(event)=> {
        const { name, value } = event.target;
        setsemesterDetails((prev)=>({
        ...prev,
            [name]:value
        }));
    }
    const departmentSubmit = async(event)=> {
        event.preventDefault();
        const temp = { sem: semesterDetails};
        const req = await axios.post("/departmentDetails/createsemester", temp);
        setdataSent(true);
    }
    const handleCloseSnack = () => {
        setdataSent(false);
        setsemesterDetails((prev)=>({
            departmentId: "",
            semesterName:"",
            }));
            setdepartment([]);
      };
      const classes = useStyles();
    return (
        <>
         <Snackbar
            open={dataSent}
            autoHideDuration={4000}
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleCloseSnack} severity="success">
            Semester Created Successfully!!!
            </Alert>
        </Snackbar>
            <form className="container" onSubmit={departmentSubmit}>
            <div className="title">Create Semester</div>
            <div className="form-group">
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  onChange={createSemester}
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
              <TextField
                id="standard-basic"
                label="Semester Name"
                type="text"
                name="semesterName"
                value={semesterDetails.semesterName}
                onChange={createSemester}
                required
              />{" "}
            </div>
            <div className="form-group">
              <button className="button">Submit</button>
            </div>
            </form>
        </>
    )
}

export default CreateNewSemester
