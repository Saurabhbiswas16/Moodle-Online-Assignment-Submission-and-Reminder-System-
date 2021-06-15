import React, {  useState } from "react";
import axios from "../Axios";
import './CreateNew.css';
import {
    TextField,
  } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
  
  
function CreateNewDeparment() {
    const [departmentName, setdepartmentName] = useState("");
    const [dataSent, setdataSent] = useState(false);
    
    const createDepartment = async(event)=> {
        const {  value } = event.target;
        setdepartmentName(value);
    }
    const departmentSubmit = async(event)=> {
        event.preventDefault();
        const temp = { dept: departmentName };
        const req = await axios.post("/departmentDetails/createdepartment", temp);
        setdataSent(true);
    }
    const handleCloseSnack = () => {
        setdataSent(false);
      };
    return (
        <>
         <Snackbar
            open={dataSent}
            autoHideDuration={4000}
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleCloseSnack} severity="success">
            Department Created Successfully!!!
            </Alert>
        </Snackbar>
            <form className="container" onSubmit={departmentSubmit}>
            <div className="title">Create Department</div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Department Name"
                type="text"
                name="Department"
                value={departmentName}
                onChange={createDepartment}
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

export default CreateNewDeparment
