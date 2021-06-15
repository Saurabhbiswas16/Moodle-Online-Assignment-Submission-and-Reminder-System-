import React, { useState } from "react";

import DepartmentUpdate from "./DepartmentUpdate";
import UpdateStudentSemester from './UpdateStudentSemester';

function NewBatch() {
  const [deptDetails, setdeptDetails] = useState({});
  const [isDepartment, setisDepartment] = useState(false);
    const selectDepartmentDetails = (dept) => {
    console.log(dept);
    if (
      Object.keys(dept.semesterId).length >= 5 
      
    ) {
      setisDepartment(true);
      setdeptDetails(dept);
    } else {
      setisDepartment(false);
    }
  };
 
  return (
    <>
      <DepartmentUpdate selectDepartmentDetails={selectDepartmentDetails} />
      {isDepartment ? (
        <UpdateStudentSemester
          handleDepartmentDetails={deptDetails}
        />
      ) : null}
      
    </>
  );
}

export default NewBatch;
