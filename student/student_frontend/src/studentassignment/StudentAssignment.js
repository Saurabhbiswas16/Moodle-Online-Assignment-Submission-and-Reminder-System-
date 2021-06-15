import React, { useState } from "react";
import PreviousDepartment from "./PreviousDepartment";
import Student from "./Student";
function StudentAssignment() {
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
    <div>
      <PreviousDepartment selectDepartmentDetails={selectDepartmentDetails} />
      <Student
        subjectbatch={deptDetails}
        studentid={localStorage.getItem("studentuser")}
        previousSemesterID={deptDetails.semesterId}
        isDepartment={isDepartment}
      />
    </div>
  );
}

export default StudentAssignment;
