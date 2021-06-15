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
 
  
  
function CreateNewBatch() {
    const [department, setdepartment] = useState([]);
    const [semester, setsemester] = useState([]);
    const [division, setdivision] = useState([]);
    const [batchDetails, setbatchDetails] = useState({
        batchName:"",
        departmentId: "",
        semesterId:"",
        divisionId: "",
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
        setbatchDetails((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
        const temp = { deptid: value };
        const req = await axios.post("/departmentDetails/semester", temp);
        setsemester(req.data);
      };
      const callDivision = async (event) => {
        
        const { name, value } = event.target;
        setbatchDetails((prevValue) => ({
          ...prevValue,
          [name]: value,
          
        }));
    
        const temp = { divid: value };
        const req = await axios.post("/departmentDetails/divison", temp);
        setdivision(req.data);
      };
    const createbatch = async(event)=> {
        const { name, value } = event.target;
        setbatchDetails((prev)=>({
        ...prev,
            [name]:value
        }));
    }
    const departmentSubmit = async(event)=> {
        event.preventDefault();
        const temp = { bat: batchDetails};
        const req = await axios.post("/departmentDetails/createbatch", temp);
        setdataSent(true);
    }
    const handleCloseSnack = () => {
        setdataSent(false);
        setbatchDetails((prev)=>({
            batchName:"",
            departmentId: "",
            semesterId:"",
            divisionId: "",     
            }));
            setdepartment([]);
            setsemester([]);
            setdivision([]);
            console.log(batchDetails);
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
            Batch Created Successfully!!!
            </Alert>
        </Snackbar>
            <form className="container" onSubmit={departmentSubmit}>
            <div className="title">Create Batch</div>
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
                    onChange={callDivision}
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
                <FormControl required className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">Division</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    onChange={createbatch}
                    className={classes.selectEmpty}
                    name="divisionId"
                    >
                    {division.map((data,index)=>(
                        <MenuItem value={data._id}>{data.div}</MenuItem>
                    ))}
                    </Select>
                    <FormHelperText>Select Division</FormHelperText>
                </FormControl>
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Batch Name"
                type="text"
                name="batchName"
                value={setbatchDetails.batchName}
                onChange={createbatch}
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

export default CreateNewBatch
