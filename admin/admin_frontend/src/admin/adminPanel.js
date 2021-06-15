import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "../Axios";
import DisplayStudentDetails from "./DisplayStudentDetails";
import "./adminPanel.css";
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

function AdminPanel() {
  const classes = useStyles();
  const [viewstudent, setViewstudent] = useState(false);
  const [requestMap, setrequestMap] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getRequest = async () => {
      await axios
        .get("admin/getRequest")
        .then((res) => {
          setrequestMap(res.data);
        })
        .catch((err) => console.log(err));
    };
    getRequest();
    console.log("in refresh");
    setRefresh(false);
  }, [refresh]);
  const deleteRequest = async (event) => {
    console.log(event.target.value);
    await axios
      .post("admin/deleteRequest", { email: event.target.value })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(true);
  };

  const acceptRequest = async (event) => {
    console.log(event.target.value);
    await axios
      .post("admin/acceptRequest", { email: event.target.value })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(true);
  };

  return (
    <>
      {requestMap.length !== 0 ? (
        <>
          <div className="form-group requestlist">
            {requestMap.map((data, index) => (
              <>
                <Accordion
                // expanded={expanded === props.assignment._id}
                // onChange={handleChange(props.assignment._id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      <h3>
                      {data.email}
                      </h3>
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      <div className="twobuttons">
                        <button
                          className="btn btn-danger"
                          onClick={deleteRequest}
                          value={data.email}
                          name={data.email}
                        >
                          delete
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={acceptRequest}
                          value={data.email}
                          name={data.email}
                        >
                          accept
                        </button>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <label>  First Name    :- {data.fname}</label><br/>
                      <label>  Middle Name   :- {data.mname}</label><br/>
                      <label>  Last Name     :- {data.lname}</label><br/>
                      <label>  Id            :- {data.id}</label><br/>
                      <label>  Date of Birth :- {data.dob.slice(0,10)}</label><br/>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
          </div>
        </>
      ) : null}
      {/* {viewstudent === true ? <DisplayStudentDetails /> : null} */}
    </>
  );
}

export default AdminPanel;
