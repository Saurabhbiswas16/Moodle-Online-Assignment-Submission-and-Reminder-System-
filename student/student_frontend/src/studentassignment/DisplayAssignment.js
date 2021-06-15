import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ViewAssignment from "../ViewAssignment";

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

function DisplayAssignment(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const history = useHistory();
  const location = useLocation();

  const routeChange = () => {
    props.getassignmentid(props.assignment._id);
    //temperory routing logic is canceled
    // console.log(location.pathname);
    // const currentPath = location.pathname;
    // let path = currentPath +'/viewAssignment/' + props.assignment._id;
    // history.push(path);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === props.assignment._id}
        onChange={handleChange(props.assignment._id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {props.assignment.title}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            <button onClick={routeChange}>view</button>
          </Typography>
        </AccordionSummary>
      </Accordion>
      {/* <h5>title :{props.assignment.title}</h5> */}
    </div>
  );
}

export default DisplayAssignment;
