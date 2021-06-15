import React, { useState, useEffect } from "react";
import axios from "../Axios";
import Button from "@material-ui/core/Button";
function FilterDashBoard(props) {
  const [filterAssignment, setfilterAssignment] = useState({
    departmentId: "",
    semesterId: "",
    subjectId: "",
    divisionId: "",
    batchId: "",
    year: "",
  });
  const [subjectAssignment, setsubjectAssignment] = useState([]);
  const [filterClick, setfilterClick] = useState(false);

  useEffect(() => {
    setfilterAssignment((prevVlaue) => ({
      ...prevVlaue,
      departmentId: props.handleDepartmentDetails.departmentId,
      semesterId: props.handleDepartmentDetails.semesterId,
      subjectId: props.handleDepartmentDetails.subjectId,
      divisionId: props.handleDepartmentDetails.divisionId,
      batchId: props.handleDepartmentDetails.batchId,
      year: props.handleDepartmentDetails.year,
    }));
  }, [props]);
  useEffect(() => {
    // setfilterClick(false);
    console.log(filterAssignment.subjectId);
    async function fetchSubjectData() {
      console.log(filterAssignment);
      const subjectData = {
        subjectId: filterAssignment.subjectId,
        batchId: filterAssignment.batchId,
        year: filterAssignment.year,
      };
      const req = await axios.post("/subjectstatus", subjectData);
      setsubjectAssignment(req.data);
    }
    if (Object.keys(filterAssignment.subjectId).length >= 5) {
      fetchSubjectData();
    }
  }, [ filterAssignment.batchId, filterAssignment.subjectId, filterAssignment.year]);

  useEffect(() => {
    if(props.isDepartment)
    {
      setfilterClick(true);
    }

  },[props.isDepartment])
  const filterData = () => {
    setfilterClick(true);
  };
  const assignmentClicked = (event) => {
    event.preventDefault();
    const { value } = event.target;
    subjectAssignment
      .filter((data) => data._id === value)
      .map((fetchdata, index) => props.handleassignmentDetails(fetchdata));
  };
  return (
    <>
      {/* <button onClick={filterData}>Filter</button> */}
      { subjectAssignment.filter((d) => d.uploadedTime.slice(0, 4) === filterAssignment.year).map((data, index) => (
              <div className="mainbutton">
                <button value={data._id} onClick={assignmentClicked}>
                  {data.title}
                </button>
              </div>
            ))
        }
    </>
  );
}

export default FilterDashBoard;
