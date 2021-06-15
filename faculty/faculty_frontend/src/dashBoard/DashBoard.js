import React, { useState } from "react";

import DepartmentDashBoard from "./DepartmentDashBoard";
import FilterDashBoard from "./FilterDashBoard";
import SubmissionStatus from "./SubmissionStatus";
import "./DashBoard.css";
import SendPersonalEmail from "./SendPersonalEmail";

function DashBoard() {
  const [deptDetails, setdeptDetails] = useState({});
  const [isDepartment, setisDepartment] = useState(false);
  // const [assignmentDetails, setassignmentDetails]  = useState({
  //     assignment:""
  // });
  const [StudentEmailID, setStudentEmailID] = useState("");
  const [viewMail, setviewMail] = useState(false);
  const [assignmentDetails, setassignmentDetails] = useState({});

  const [isassignment, setisassignment] = useState(false);
  const selectDepartmentDetails = (dept) => {
    console.log(dept);
    if (Object.keys(dept.year).length >= 3 && dept.batchId.length !== 0 && dept.subjectId.length !== 0)
     {
      setisDepartment(true);
      setdeptDetails(dept);
    } else {
      setisDepartment(false);
      setisassignment(false);
    }
  };
  const handleassignmentDetails = (assignment) => {
    if (Object.keys(assignment._id).length >= 5) {
      setassignmentDetails(assignment);
      setisassignment(true);
    } else {
      setisassignment(false);
    }
  };
  var studentEmailID = (emailID) => {
    setStudentEmailID(emailID);
    setviewMail(true);
  };
  return (
    <>
      <DepartmentDashBoard selectDepartmentDetails={selectDepartmentDetails} />
      <div className="bodyConatiner">
        <div className="filterDashBoard">
          {isDepartment ? (
            <FilterDashBoard
              handleDepartmentDetails={deptDetails}
              handleassignmentDetails={handleassignmentDetails}
              studentEmailID={studentEmailID}
              isDepartment={isDepartment}
            />
          ) : null}
        </div>
        <div className="submissionStatus">
          {isassignment ? (
            <SubmissionStatus selectedAssignment={assignmentDetails} studentEmailID={studentEmailID}/>
          ) : null}
        </div>
        <div className="submissionStatus">
          {viewMail ? (
            <SendPersonalEmail StudentEmailID={StudentEmailID} />
          ) : null}
        </div>
        {/* {isassignment?<ResponsiveDrawer />:null}  */}
      </div>
    </>
  );
}

export default DashBoard;
