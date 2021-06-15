import React, { useEffect, useState } from "react";
import axios from "../Axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, withTheme } from "@material-ui/core/styles";
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

function AllAssignment(props) {
  const classes = useStyles();
  const [allAssignment, setallAssignment] = useState([]);
  const [filterClick, setfilterClick] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleexpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [filterBatch, setfilterBatch] = useState({
    departmentId: "",
    semesterId: "",
    subjectId: "",
    divisionId: "",
    batchId: "",
  });
  useEffect(() => {
    setfilterBatch((prevVlaue) => ({
      ...prevVlaue,
      departmentId: props.handleDepartmentDetails.departmentId,
      semesterId: props.handleDepartmentDetails.semesterId,
      subjectId: props.handleDepartmentDetails.subjectId,
      divisionId: props.handleDepartmentDetails.divisionId,
      batchId: props.handleDepartmentDetails.batchId,
    }));
  }, [props]);
  useEffect(() => {
    console.log(filterBatch.batchId);
    async function fetchSubjectData() {
      // console.log(filterAssignment.subjectId);
      const subjectData = {
        batId: filterBatch.batchId,
        subjectId: filterBatch.subjectId,
      };
      const req = await axios.post("/allAssignment", subjectData);
      setallAssignment(req.data);
    }
    if (Object.keys(filterBatch.batchId).length >= 5) {
      fetchSubjectData();
    }
  }, [filterBatch.batchId]);
  // const filterData = () => {
  //   setfilterClick(true);
  // };
  useEffect(() => {
    if(props.isDepartment)
    {
      setfilterClick(true);
    }
  },[props.isDepartment])
  return (
    <>
      {/* <button onClick={filterData}>Filter</button> */}
      {/* {filterClick?setallAssignment.map((filteredData,index)=>(
            <li>{filteredData._id}</li>
            ))
            :null} */}
      {filterClick
        ? allAssignment
            .filter((data) => data._id !== null)
            .map((filteredData, index) => (
              <Accordion
                expanded={expanded === filteredData._id}
                onChange={handleexpanded(filteredData._id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>
                    {filteredData.title}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {filteredData.DeadLine}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{filteredData.description}</Typography>
                  <Typography>
                 <button className="btn btn-primary">
                      <a
                        href={filteredData.GuidlineFilePath}
                        target="_blank"
                        style={{ color: "white" }}
                      >
                        view
                      </a>
                    </button>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
        : null}
    </>
  );
}

export default AllAssignment;
