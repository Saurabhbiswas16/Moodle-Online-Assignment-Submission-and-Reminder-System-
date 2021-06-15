import React,{useEffect,useState} from 'react'
import axios from '../Axios';

function SubmissionStatus(props) {
    const [assignment, setassignment] = useState({
        _id:"",
        teacherId: "",
        title:"",
        departmentId:"",
        semesterId:"",
        subjectId:"",
        divisionId:"",
        batchId:"",
        Description:"",
        uploadedTime:"",
        DeadLine: "",
        GuidlineFilePath: [""],
    });
    const [studentsStatus,setstudentsStatus] = useState([]);
    const [isstudentsStatus, setisstudentsStatus] = useState(false)
    const [batchStudents, setbatchStudents] = useState([])
    useEffect(() => {
        setisstudentsStatus(false);
        setassignment((prevVlaue)=>({
            ...prevVlaue,
            _id:props.selectedAssignment._id,
            teacherId: props.selectedAssignment.teacherId,
            title:props.selectedAssignment.title,
            departmentId:props.selectedAssignment.departmentId,
            semesterId:props.selectedAssignment.semesterId,
            subjectId:props.selectedAssignment.subjectId,
            divisionId:props.selectedAssignment.divisionId,
            batchId:props.selectedAssignment.batchId,
            Description:props.selectedAssignment.Description,
            uploadedTime:props.selectedAssignment.uploadedTime,
            DeadLine: props.selectedAssignment.DeadLine,
            GuidlineFilePath: props.selectedAssignment.GuidlineFilePath,
        }));
        const students=async ()=>{
            const tempID={assignId:assignment._id}
            const req=await axios.post("/studentStatus",tempID);
            console.log(req.data);
            setstudentsStatus(req.data);
        
        }
        const fetchBranch=async ()=>{
            const tempID={branch:assignment.batchId}
            const req=await axios.post("/branchStudent",tempID);
            setbatchStudents(req.data);
        
        }
        if(Object.keys(assignment._id).length >=5)
        {
            students();  
            fetchBranch();
            setisstudentsStatus(true);
        }

    }, [assignment._id, assignment.batchId, props])

    return (
        <>
        
         <h1>Not Submitted</h1>
          {isstudentsStatus?studentsStatus.filter(data=>data.isUploaded===false).map((filteredData,index)=>(
            batchStudents.filter(fetchBranch=> fetchBranch._id===filteredData.studentId).map((student,traverse)=>(
                <li>{student.fname}</li>
            ))
            ))
            :null}
            <h1>On Time Submission</h1>
            {isstudentsStatus?studentsStatus.filter(data=>data.isUploaded<=assignment.DeadLine).map((filteredData,index)=>(
            batchStudents.filter(fetchBranch=> fetchBranch._id===filteredData.studentId).map((student,traverse)=>(
                <li>{student.fname}</li>
            ))      
            ))
            :null}

            <h1>Late Submission</h1>
            {isstudentsStatus?studentsStatus.filter(data=>data.isUploaded>assignment.DeadLine).map((filteredData,index)=>(
            batchStudents.filter(fetchBranch=> fetchBranch._id===filteredData.studentId).map((student,traverse)=>(
                <li>{student.fname}</li>
            ))           
            ))
            :null}
        </>
    )
}

export default SubmissionStatus
