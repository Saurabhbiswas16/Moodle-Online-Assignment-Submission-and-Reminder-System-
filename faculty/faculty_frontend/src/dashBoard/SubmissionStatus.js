// import React, { useEffect, useState } from "react";
// import axios from "../Axios";
// import Button from "@material-ui/core/Button";
// import "./SubmissionStatus.css";
// function SubmissionStatus(props) {
//   const [ontime, setontime] = useState(false);
//   const [notsub, setnotsub] = useState(false);
//   const [late, setlate] = useState(false);

//   const [assignment, setassignment] = useState({
//     _id: "",
//     teacherId: "",
//     title: "",
//     departmentId: "",
//     semesterId: "",
//     subjectId: "",
//     divisionId: "",
//     batchId: "",
//     Description: "",
//     uploadedTime: "",
//     DeadLine: "",
//     GuidlineFilePath: [""],
//   });
//   const [studentsStatus, setstudentsStatus] = useState([]);
//   const [isstudentsStatus, setisstudentsStatus] = useState(false);
//   const [batchStudents, setbatchStudents] = useState([]);
//   useEffect(() => {
//     setisstudentsStatus(false);
//     setassignment((prevVlaue) => ({
//       ...prevVlaue,
//       _id: props.selectedAssignment._id,
//       teacherId: props.selectedAssignment.teacherId,
//       title: props.selectedAssignment.title,
//       departmentId: props.selectedAssignment.departmentId,
//       semesterId: props.selectedAssignment.semesterId,
//       subjectId: props.selectedAssignment.subjectId,
//       divisionId: props.selectedAssignment.divisionId,
//       batchId: props.selectedAssignment.batchId,
//       Description: props.selectedAssignment.Description,
//       uploadedTime: props.selectedAssignment.uploadedTime,
//       DeadLine: props.selectedAssignment.DeadLine,
//       GuidlineFilePath: props.selectedAssignment.GuidlineFilePath,
//     }));
//     const students = async () => {
//       const tempID = { assignId: assignment._id };
//       const req = await axios.post("/studentStatus", tempID);
//       console.log("staudent data");
//       console.log(req.data);
//       setstudentsStatus(req.data);
//     };
//     const fetchBranch = async () => {
//       const tempID = { branch: assignment.batchId };
//       const req = await axios.post("/branchStudent", tempID);
//       console.log("all student in branch");
//       console.log(req.data);
//       setbatchStudents(req.data);
//     };
//     if (Object.keys(assignment._id).length >= 5) {
//       students();
//       fetchBranch();
//       setisstudentsStatus(true);
//     }
//     setnotsub(false);
//     setontime(false);
//     setlate(false);
//   }, [assignment._id, assignment.batchId, props]);

//   const OnTimeSubmission = (event) => {
//     event.preventDefault();
//     setlate(false);
//     setnotsub(false);
//     setontime(true);
//   };
//   const NotSubmitted = (event) => {
//     event.preventDefault();
//     setlate(false);
//     setontime(false);
//     setnotsub(true);
//   };
//   const LateSubmission = (event) => {
//     event.preventDefault();
//     setnotsub(false);
//     setontime(false);
//     setlate(true);
//   };

//   const getstudentbyid = async (id) => {
//     console.log(id);
//     const student = await axios.post("/student/getstudentbyid", {
//       studentid: id,
//     });
//     console.log(student.data.fname);
//     return <div>student.data.fname</div>;
//   };
//   return (
//     <>
//       {isstudentsStatus ? (
//         <div className="mainbutton">
//           <Button variant="contained" onClick={OnTimeSubmission}>
//             On Time Submission
//           </Button>
//           <Button variant="contained" onClick={NotSubmitted}>
//             Not Submitted
//           </Button>
//           <Button variant="contained" onClick={LateSubmission}>
//             Late Submission
//           </Button>
//         </div>
//       ) : null}
//       {notsub
//         ? //  studentsStatus
//           //     .filter((data) => data.isUploaded === true )
//           //     .map(
//           //       (filteredData, index) => <li>{filteredData.studentId}</li>
//           //       // batchStudents
//           //       //   .filter(
//           //       //     (fetchBranch) => fetchBranch._id === filteredData.studentId
//           //       //   )
//           //       //   .map((student, traverse) => <li>{student.fname}</li>)
//           //     )
//           studentsStatus
//             .filter((data) => data.isUploaded == false)
//             .map((filteredData, index) => {
//               // var s = getstudentbyid(filteredData.studentId);
//               // console.log(s);
//               return <li>{filteredData.studentId}</li>;
//             })
//         : null}

//       {ontime
//         ? studentsStatus
//             .filter((data) => data.isUploaded == true)
//             .map((filteredData, index) => {
//               // var s = getstudentbyid(filteredData.studentId);
//               // console.log(s);
//               return <li>{filteredData.studentId}</li>;
//             })
//         : null}

//       {late
//         ? studentsStatus
//             .filter((data) => data.isUploaded > assignment.DeadLine)
//             .map((filteredData, index) =>
//               batchStudents
//                 .filter(
//                   (fetchBranch) => fetchBranch._id === filteredData.studentId
//                 )
//                 .map((student, traverse) => <li>{student.fname}</li>)
//             )
//         : null}
//     </>
//   );
// }

// export default SubmissionStatus;

//*************************************************************************************************************** */

import React, { useEffect, useState } from "react";
import axios from "../Axios";
import Button from "@material-ui/core/Button";
import "./SubmissionStatus.css";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function SubmissionStatus(props) {
  const classes = useStyles();
  const [ontime, setontime] = useState(false);
  const [notsub, setnotsub] = useState(false);
  const [late, setlate] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [a, setA] = useState("");
  const handleChange = (panel, studentid, assignmentid) => (
    event,
    isExpanded
  ) => {
    console.log("hello in handle change");
    console.log("student id ", studentid);
    console.log("assignmet id ", assignmentid);
    axios
      .post("/student/getstudentbyid", {
        studentid: studentid,
        assignmentid: assignmentid,
      })
      .then((res) => {
        console.log("response of axios", res.data);
        setA(res.data);
      });
    setExpanded(isExpanded ? panel : false);
  };

  const [assignment, setassignment] = useState({
    _id: "",
    teacherId: "",
    title: "",
    departmentId: "",
    semesterId: "",
    subjectId: "",
    divisionId: "",
    batchId: "",
    Description: "",
    uploadedTime: "",
    DeadLine: "",
    GuidlineFilePath: [""],
  });
  const [studentsStatus, setstudentsStatus] = useState([]);
  const [isstudentsStatus, setisstudentsStatus] = useState(false);
  const [batchStudents, setbatchStudents] = useState([]);
  useEffect(() => {
    setisstudentsStatus(false);
    setassignment((prevVlaue) => ({
      ...prevVlaue,
      _id: props.selectedAssignment._id,
      teacherId: props.selectedAssignment.teacherId,
      title: props.selectedAssignment.title,
      departmentId: props.selectedAssignment.departmentId,
      semesterId: props.selectedAssignment.semesterId,
      subjectId: props.selectedAssignment.subjectId,
      divisionId: props.selectedAssignment.divisionId,
      batchId: props.selectedAssignment.batchId,
      Description: props.selectedAssignment.Description,
      uploadedTime: props.selectedAssignment.uploadedTime,
      DeadLine: props.selectedAssignment.DeadLine,
      GuidlineFilePath: props.selectedAssignment.GuidlineFilePath,
    }));
    const students = async () => {
      const tempID = { assignId: assignment._id };
      const req = await axios.post("/studentStatus", tempID);
      console.log(req.data);
      setstudentsStatus(req.data);
    };
    const fetchBranch = async () => {
      const tempID = { branch: assignment.batchId };
      const req = await axios.post("/branchStudent", tempID);
      setbatchStudents(req.data);
    };
    if (Object.keys(assignment._id).length >= 5) {
      students();
      fetchBranch();
      setisstudentsStatus(true);
    }
    setnotsub(false);
    setontime(false);
    setlate(false);
  }, [assignment._id, assignment.batchId, props]);

  const OnTimeSubmission = (event) => {
    event.preventDefault();
    setlate(false);
    setnotsub(false);
    setontime(true);
  };
  const NotSubmitted = (event) => {
    event.preventDefault();
    setlate(false);
    setontime(false);
    setnotsub(true);
  };
  const LateSubmission = (event) => {
    event.preventDefault();
    setnotsub(false);
    setontime(false);
    setlate(true);
  };
  const routeChange = (event) => {
    const emailID =event.target.value;
    props.studentEmailID(emailID);
    //temperory routing logic is canceled
    // console.log(location.pathname);
    // const currentPath = location.pathname;
    // let path = currentPath +'/viewAssignment/' + props.assignment._id;
    // history.push(path);
  };
  return (
    <>
      {isstudentsStatus ? (
        <div className="mainbutton">
          <Button variant="contained" onClick={OnTimeSubmission}>
            On Time Submission
          </Button>
          <Button variant="contained" onClick={NotSubmitted}>
            Not Submitted
          </Button>
          <Button variant="contained" onClick={LateSubmission}>
            Late Submission
          </Button>
        </div>
      ) : null}
      {notsub
        ? studentsStatus
            .filter((data) => data.isUploaded === false)
            .map((filteredData, index) =>
              batchStudents
                .filter(
                  (fetchBranch) => fetchBranch._id === filteredData.studentId
                )
                .map((student, traverse) => (
                  // <li>{student.fname}</li>
                  <Accordion
                    expanded={expanded === filteredData._id}
                    onChange={handleChange(filteredData._id, student._id)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        {student.fname}
                      </Typography>
                      {/* <Typography className={classes.secondaryHeading}>
                        {filteredData.subject}
                      </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        not submitted so no file to display
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        <button  value={student.email} onClick={routeChange}>Send Mail</button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
            )
        : null}

      {ontime
        ? studentsStatus
            .filter((data) => data.uploadedTime <= assignment.DeadLine)
            .map((filteredData, index) =>
              batchStudents
                .filter(
                  (fetchBranch) => fetchBranch._id === filteredData.studentId
                )
                .map((student, traverse) => (
                  // <li>{student.fname}</li>
                  <Accordion
                    expanded={expanded === filteredData._id}
                    onChange={handleChange(
                      filteredData._id,
                      student._id,
                      filteredData.assignmentId
                    )}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        {student.fname}
                      </Typography>
                      {/* <Typography className={classes.secondaryHeading}>
                        {filteredData.subject}
                      </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <button className="btn btn-primary">
                          <a
                            id="download"
                            download=""
                            href={
                              "http://localhost:8000/download/student/" +
                              a.submissionFilePath
                            }
                            style={{ color: "white" }}
                          >
                            download
                          </a>
                        </button>
                        {a.submissionFilePath}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
            )
        : null}

      {late
        ? studentsStatus
            .filter((data) => data.uploadedTime > assignment.DeadLine)
            .map((filteredData, index) =>
              batchStudents
                .filter(
                  (fetchBranch) => fetchBranch._id === filteredData.studentId
                )
                .map((student, traverse) => (
                  // <li>{student.fname}</li>
                  <Accordion
                    expanded={expanded === filteredData._id}
                    onChange={handleChange(
                      filteredData._id,
                      student._id,
                      filteredData.assignmentId
                    )}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        {student.fname}
                      </Typography>
                      {/* <Typography className={classes.secondaryHeading}>
                        {filteredData.subject}
                      </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <button className="btn btn-primary">
                          <a
                            id="download"
                            download=""
                            href={
                              "http://localhost:8000/download/student/" +
                              a.submissionFilePath
                            }
                            style={{ color: "white" }}
                          >
                            download
                          </a>
                        </button>
                        {a.submissionFilePath}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
            )
        : null}
    </>
  );
}

export default SubmissionStatus;
