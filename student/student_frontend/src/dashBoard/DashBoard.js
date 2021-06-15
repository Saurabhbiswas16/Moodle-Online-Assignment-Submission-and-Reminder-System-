import React, { useState } from "react";

import DepartmentDashBoard from "./DepartmentDashBoard";
import FilterDashBoard from "./FilterDashBoard";
import SubmissionStatus from "./SubmissionStatus";

function DashBoard() {
  const [deptDetails, setdeptDetails] = useState({});
  const [isDepartment, setisDepartment] = useState(false);
  // const [assignmentDetails, setassignmentDetails]  = useState({
  //     assignment:""
  // });
  const [assignmentDetails, setassignmentDetails] = useState({});

  const [isassignment, setisassignment] = useState(false);
  const selectDepartmentDetails = (dept) => {
    console.log(dept);
    if (
      Object.keys(dept.batchId).length >= 5 &&
      Object.keys(dept.subjectId).length >= 5
    ) {
      setisDepartment(true);
      setdeptDetails(dept);
    } else {
      setisDepartment(false);
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
  return (
    <>
      <DepartmentDashBoard selectDepartmentDetails={selectDepartmentDetails} />
      {isDepartment ? (
        <FilterDashBoard
          handleDepartmentDetails={deptDetails}
          handleassignmentDetails={handleassignmentDetails}
        />
      ) : null}
      {isassignment ? (
        <SubmissionStatus selectedAssignment={assignmentDetails} />
      ) : null}
    </>
  );
}

export default DashBoard;
