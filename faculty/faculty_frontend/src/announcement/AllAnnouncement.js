import React, { useEffect, useState } from "react";
import axios from "../Axios";
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

function AllAnnouncement(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [allAnnouncement, setallAnnouncement] = useState([]);
  const [filterClick, setfilterClick] = useState(false);
  const [filterAnnouncement, setfilterAnnouncement] = useState({
    departmentId: "",
    semesterId: "",
    divisionId: "",
    batchId: "",
  });
  const [finalId, setfinalId] = useState({
    sendMailID: "",
    sendMailName: "",
  });
  useEffect(() => {
    setfilterClick(false);
    setfilterAnnouncement((prevVlaue) => ({
      ...prevVlaue,
      departmentId: props.handleDepartmentDetails.departmentId,
      semesterId: props.handleDepartmentDetails.semesterId,
      divisionId: props.handleDepartmentDetails.divisionId,
      batchId: props.handleDepartmentDetails.batchId,
    }));
    //callAnnouncement();
  }, [props]);

  // useEffect(() => {
  //   if(props.isDepartment)
  //   {
  //     callAnnouncement()
  //   }
  // },[props.isDepartment])
  const sendAnnouncement = async () => {
    const req = await axios.post("/allannouncement", finalId);
    setallAnnouncement(req.data);
  };
  const callAnnouncement = () => {
    console.log(filterAnnouncement);
    if (Object.keys(filterAnnouncement.batchId).length <= 5) {
      if (Object.keys(filterAnnouncement.divisionId).length <= 5) {
        if (Object.keys(filterAnnouncement.semesterId).length <= 5) {
          if (Object.keys(filterAnnouncement.departmentId).length <= 5) {
          } else {
            setfinalId({
              sendMailID: filterAnnouncement.departmentId,
              sendMailName: "departmentId",
            });
          }
        } else {
          console.log("semesterId");
          setfinalId({
            sendMailID: filterAnnouncement.semesterId,
            sendMailName: "semesterId",
          });
        }
      } else {
        setfinalId({
          sendMailID: filterAnnouncement.divisionId,
          sendMailName: "divisionId",
        });
      }
    } else {
      setfinalId({
        sendMailID: filterAnnouncement.batchId,
        sendMailName: "batchId",
      });
    }

    console.log(finalId);
    sendAnnouncement();
   
  };

  const filterData = (event) => {
    event.preventDefault();
    callAnnouncement();
    setfilterClick(true);
  };
  return (
    <>
      <button onClick={filterData}>Filter</button>
      {/* {filterClick?allAnnouncement.filter(data=>data._id !==null).map((filteredData,index)=>(
            <li>{filteredData.subject}</li>
            
            ))
            :null} */}

      <div className={classes.root}>
        {filterClick
          ? allAnnouncement
              .filter((data) => data._id !== null)
              .map((filteredData, index) => (
                <Accordion
                  expanded={expanded === filteredData._id}
                  onChange={handleChange(filteredData._id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      Saurabh Biswas
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {filteredData.subject}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{filteredData.email_body}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
          : null}
      </div>
    </>
  );
}

export default AllAnnouncement;
