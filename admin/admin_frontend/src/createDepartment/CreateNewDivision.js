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
 
  
  
function CreateNewDivision() {
    const [department, setdepartment] = useState([]);
    const [semester, setsemester] = useState([])
    const [divisionDetails, setdivisionDetails] = useState({
        divisionName:"",
        departmentId: "",
        semesterId:"",
        
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
      const callSemester = async (event) => {
        const { name, value } = event.target;
        setdivisionDetails((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
        const temp = { deptid: value };
        const req = await axios.post("/departmentDetails/semester", temp);
        setsemester(req.data);
      };
    const createdivision = async(event)=> {
        const { name, value } = event.target;
        setdivisionDetails((prev)=>({
        ...prev,
            [name]:value
        }));
    }
    const departmentSubmit = async(event)=> {
        event.preventDefault();
        const temp = { divi: divisionDetails};
        const req = await axios.post("/departmentDetails/createdivison", temp);
        setdataSent(true);
    }
    const handleCloseSnack = () => {
        setdataSent(false);
        setdivisionDetails((prev)=>({
            divisionName:"",
            departmentId: "",
            semesterId:"",     
            }));
            setdepartment([]);
            setsemester([]);
            console.log(divisionDetails);
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
            Division Created Successfully!!!
            </Alert>
        </Snackbar>
            <form className="container" onSubmit={departmentSubmit}>
            <div className="title">Create Division</div>
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
                    <InputLabel id="demo-simple-select-required-label">Semester</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    onChange={createdivision}
                    className={classes.selectEmpty}
                    name="semesterId"
                    >
                    {semester.map((data,index)=>(
                        <MenuItem value={data._id}>{data.sem}</MenuItem>
                    ))}
                    </Select>
                    <FormHelperText>Select Semester</FormHelperText>
                </FormControl>
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Division Name"
                type="text"
                name="divisionName"
                value={setdivisionDetails.divisionName}
                onChange={createdivision}
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

export default CreateNewDivision
