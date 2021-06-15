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
 
  
  
function CreateNewYear() {
    const [BatchYearName, setBatchYearName] = useState("");
    const [dataSent, setdataSent] = useState(false);
    
    const createBatchYear = async(event)=> {
        const {  value } = event.target;
        setBatchYearName(value);
    }
    const BatchYearSubmit = async(event)=> {
        event.preventDefault();
        const temp = { dept: BatchYearName };
        const req = await axios.post("/departmentDetails/createyear", temp);
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
            Batch Year Created Successfully!!!
            </Alert>
        </Snackbar>
            <form className="container" onSubmit={BatchYearSubmit}>
            <div className="title">Batch Year</div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Batch Year"
                type="text"
                name="BatchYear"
                value={BatchYearName}
                onChange={createBatchYear}
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

export default CreateNewYear
