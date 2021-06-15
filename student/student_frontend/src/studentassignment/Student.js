import React, { useState, useEffect } from "react";

import axios from "../Axios";
import DisplayAssignment from "./DisplayAssignment";
import ViewAssignment from "../ViewAssignment";
import "./Student.css";
import PreviousDepartment from './PreviousDepartment'


function Student(props) {
  // let { Assignmentid } = useParams();

  const [studentAssignments, setStudentAssignments] = useState([]);
  const [Assignmentid, setAssignmentid] = useState("");
  const [viewassignment, setViewassignment] = useState(false);
  const [studentdetails, setStudentdetails] = useState({});
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  
  useEffect(async () => {
    await axios
      .post("/student/getstudentdetails", {
        studentId: localStorage.getItem("studentuser"),
      })
      .then((res) => {
        console.log(res.data);
        setStudentdetails(res.data);
        console.log(studentdetails);
      });
      
  }, []);
  useEffect(async () => {
    if(props.isDepartment)
    {
     await axios
      .post("/departmentDetails/subject", {
        semid: props.previousSemesterID,
      })
      .then((res) => {
        setSubjectList(res.data);
      });
      setStudentAssignments([])
     
    }
    
  },[props.isDepartment,props.previousSemesterID])
  useEffect(async() => {
    console.log(studentdetails);
    await axios
      .post("/departmentDetails/subject", {
        semid: studentdetails.semesterId,
      })
      .then((res) => {
        console.log(res.data);
        setSubjectList(res.data);
      });
  }, [studentdetails]);

  var getassignmentid = (assignmentid) => {
    setAssignmentid(assignmentid);
    setViewassignment(true);
  };
  useEffect(async () => {
    console.log("get student data");
    console.log(props.subjectbatch);
    const resdata = await axios.post("/getstudentassignments", {
      subjectbatch: props.subjectbatch,
      subjectId: selectedSubject,
      studentid: props.studentid,
    });
    console.log(resdata);
    if (resdata.data === undefined) {
      console.log("res undefined");
      setStudentAssignments({});
    } else setStudentAssignments(resdata.data);
    console.log(studentAssignments);
  }, [selectedSubject]);
  const subjectButtonClick = (event) => {
    console.log(event.target.value);
    setSelectedSubject(event.target.value);
  };
  
  var title = { title: "faizan" };
  return (
    <div className="student">
      {/* <button onClick={handleClick}>send</button> */}
      <div className="subjectbox">
        <div className="subjectlist">
          {Object.keys(subjectList).length === 0
            ? null
            : subjectList.map((subject) => (
                <div className="subjectbutton">
                  <button
                    className="subjectbutton"
                    value={subject._id}
                    onClick={subjectButtonClick}
                  >
                    {subject.subject}
                  </button>
                </div>
              ))}
        </div>
        
        <div className="assignmentlist">
          {studentAssignments.map((a) => (
            <DisplayAssignment
              assignment={a}
              getassignmentid={getassignmentid}
            />
          ))}
        </div>
      </div>
      {viewassignment === true ? (
        <ViewAssignment
          Assignmentid={Assignmentid}
          setViewassignment={setViewassignment}
        />
      ) : null}
    </div>
  );
}

export default Student;