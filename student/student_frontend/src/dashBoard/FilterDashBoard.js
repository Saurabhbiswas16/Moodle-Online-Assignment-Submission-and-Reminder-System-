import React, { useState,useEffect } from 'react';
import axios from '../Axios';
function FilterDashBoard(props) {
    const [filterAssignment, setfilterAssignment] = useState({
        departmentId:"",
        semesterId:"",
        subjectId:"",
        divisionId:"",
        batchId:"",
    })
    const [subjectAssignment, setsubjectAssignment] = useState([]);
    const [filterClick, setfilterClick] = useState(false);

    useEffect(() => {
        setfilterAssignment((prevVlaue)=>({
            ...prevVlaue,
            departmentId:props.handleDepartmentDetails.departmentId,
            semesterId:props.handleDepartmentDetails.semesterId,
            subjectId:props.handleDepartmentDetails.subjectId,
            divisionId:props.handleDepartmentDetails.divisionId,
            batchId:props.handleDepartmentDetails.batchId,
        }))
    }, [props])
    useEffect(() => {
        setfilterClick(false);
        console.log(filterAssignment.subjectId);
        async function  fetchSubjectData() {
            console.log(filterAssignment.subjectId);
            const subjectData={subId:filterAssignment.batchId}
           const req= await axios.post('/subjectstatus',subjectData);
           setsubjectAssignment(req.data);
        }
        if(Object.keys(filterAssignment.subjectId).length >=5)
        {
            fetchSubjectData();
        }
        

    },[filterAssignment.batchId, filterAssignment.subjectId])
    const filterData=()=>{
        setfilterClick(true);      
    }
    const assignmentClicked=(event)=>{
        event.preventDefault();
        const {value}=event.target;
        subjectAssignment.filter(data => data._id===value).map((fetchdata,index)=>(
            props.handleassignmentDetails(fetchdata)
        ))
        
    }
    return (
        <>
           <button onClick={filterData}>Filter</button> 
            {filterClick?subjectAssignment.map((data,index)=>(
                <button value={data._id} onClick={assignmentClicked}>{data.title}</button>
            )):null}
        </>
    )
}

export default FilterDashBoard
