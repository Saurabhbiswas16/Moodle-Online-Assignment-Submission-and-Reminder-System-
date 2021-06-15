import React, { useEffect, useState } from "react";
import axios from "../Axios";
import Button from "@material-ui/core/Button";
import  './CreateNew.css';
import CreateNewDeparment from './CreateNewDeparment'
import CreateNewSemester from './CreateNewSemester'
import CreateNewSubject from './CreateNewSubject'
import CreateNewDivision from './CreateNewDivision'
import CreateNewBatch from './CreateNewBatch';
import CreateNewYear from './CreateNewYear';
function CreateNew() {
    const [state, setstate] = useState({
        department:false,
        semester:false,
        subject:false,
        division:false,
        batch:false,
        year:false
    });
    const onChangedepartment=async(event)=>{
        const { name } = event.target;
        setstate((prev)=>({
            [name]:true,
        }))
        
    }
    return (
        <>
            <div className="mainbutton">
            <button variant="contained" name="department" activeClassName="navbar_link" onClick={onChangedepartment}>
               Create Department
            </button>
            <button variant="contained" name="semester" onClick={onChangedepartment}>
                Create Semester
            </button>
            <button variant="contained" name="subject" onClick={onChangedepartment}>
                Create Subject
            </button>
            <button variant="contained" name="division" onClick={onChangedepartment}>
                Create Division
            </button>
            <button variant="contained" name="batch" onClick={onChangedepartment}>
                Create Batch
            </button>
            <button variant="contained" name="year" onClick={onChangedepartment}>
                Create Year
            </button>
            </div>
            {state.department?<CreateNewDeparment/>:null}
            {state.semester?<CreateNewSemester/>:null}
            {state.subject?<CreateNewSubject />:null}
            {state.division?<CreateNewDivision />:null}
            {state.batch?<CreateNewBatch />:null}
            {state.year?<CreateNewYear />:null}

        </>
    )
}

export default CreateNew
