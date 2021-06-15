import React, { useState, useEffect } from "react";
import axios from "../Axios";
import "./Announcement.css";
import SendAnnouncement from "./SendAnnouncement";
import "./CreateAnnouncement.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateAnnouncement(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [dataSent, setdataSent] = useState(false);

  const [finalId, setfinalId] = useState({
    sendMailID: "",
    sendMailName: "",
  });
  const [announcement, setannouncement] = useState({
    departmentId: "",
    semesterId: "",
    divisionId: "",
    batchId: "",
    sendMailID: "",
    sendMailName: "",
    subject: "",
    email_body: "",
  });
  useEffect(() => {
    setannouncement((prevVlaue) => ({
      ...prevVlaue,
      departmentId: props.handleDepartmentDetails.departmentId,
      semesterId: props.handleDepartmentDetails.semesterId,
      divisionId: props.handleDepartmentDetails.divisionId,
      batchId: props.handleDepartmentDetails.batchId,
    }));
  }, [props]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setannouncement({
      sendMailID: "",
      sendMailName: "",
      subject: "",
      email_body: "",
    });
  };
  const handleCloseSnack = () => {
    setdataSent(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleAnnouncement = (event) => {
    const { name, value } = event.target;
    setannouncement((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const sendAnnouncement = async () => {
    const req = await axios.post("/announcement", announcement);
    //   .then(()=>{
    //       //setdataSent(true);

    //   })
    setdataSent(true);
  };
  const submitAnnouncement = (event) => {
    event.preventDefault();
    console.log(announcement);
    if (Object.keys(announcement.batchId).length <= 5) {
      if (Object.keys(announcement.divisionId).length <= 5) {
        if (Object.keys(announcement.semesterId).length <= 5) {
          if (Object.keys(announcement.departmentId).length <= 5) {
          } else {
            setfinalId({
              sendMailID: announcement.departmentId,
              sendMailName: "departmentId",
            });
          }
        } else {
          console.log("semesterId");
          setfinalId({
            sendMailID: announcement.semesterId,
            sendMailName: "semesterId",
          });
        }
      } else {
        setfinalId({
          sendMailID: announcement.divisionId,
          sendMailName: "divisionId",
        });
      }
    } else {
      setfinalId({
        sendMailID: announcement.batchId,
        sendMailName: "batchId",
      });
    }
    announcement.sendMailID = finalId.sendMailID;
    announcement.sendMailName = finalId.sendMailName;
    sendAnnouncement();
  };

  return (
    <>
      <div>
        <Snackbar
          open={dataSent}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnack} severity="success">
            Announcement Send Successfully!!!!
          </Alert>
        </Snackbar>

        <button className="createButton" onClick={handleClickOpen("body")}>
          <span className="addIcon">
            <AddBoxIcon style={{ fontSize: "50px" }} />
          </span>{" "}
          Create
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Announcement</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="form-group">
                <TextField
                  type="text"
                  id="standard-basic"
                  label="Subject"
                  name="subject"
                  style={{ width: "500px" }}
                  autoFocus
                  margin="dense"
                  value={announcement.subject}
                  required
                  onChange={handleAnnouncement}
                />
              </div>
              <div className="form-group">
                <TextField
                  type="text"
                  id="outlined-multiline-static"
                  label="Body"
                  multiline
                  rows={15}
                  name="email_body"
                  value={announcement.email_body}
                  style={{ width: "500px" }}
                  margin="dense"
                  required
                  onChange={handleAnnouncement}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={submitAnnouncement} color="primary">
              Send Announcement
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default CreateAnnouncement;
