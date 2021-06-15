import React, { useState } from "react";
import DepartmentDetails from "./DepartmentDetails";

import CreateAssignment from "./CreateAssignment";
import AllAssignment from "./AllAssignment";
function TeacherAssignment() {
  const [deptDetails, setdeptDetails] = useState({});
  const [isDepartment, setisDepartment] = useState(false);

  const selectDepartmentDetails = (dept) => {
    console.log(dept);
    if (dept.batchId.length !== 0 && dept.subjectId.length !== 0) {
      setisDepartment(true);
      setdeptDetails(dept);
    } else {
      setisDepartment(false);
    }
  };
  return (
    <>
      <DepartmentDetails selectDepartmentDetails={selectDepartmentDetails} />
      {isDepartment ? (
        <CreateAssignment handleDepartmentDetails={deptDetails} />
      ) : null}
      {isDepartment ? (
        <AllAssignment handleDepartmentDetails={deptDetails} isDepartment={isDepartment}/>
      ) : null}
    </>
  );
}

export default TeacherAssignment;
