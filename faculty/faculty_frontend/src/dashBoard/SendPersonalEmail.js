import React, { useState, useEffect } from "react";
import axios from "../Axios";
import "../announcement/Announcement.css";
import "../announcement/CreateAnnouncement.css";
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

  
  const [announcement, setannouncement] = useState({
    sendMailID: "",
    subject: "",
    email_body: "",
  });
  useEffect(() => {
    setannouncement((prevVlaue) => ({
      ...prevVlaue,
      sendMailID: props.StudentEmailID,
    }));
    setOpen(true);
    setScroll("bodyy");
  }, [props.StudentEmailID]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setannouncement({
      sendMailID: "",
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

  
  const submitAnnouncement = async (event) => {
    event.preventDefault();
    const req = await axios.post("/personalMail", announcement);
    setdataSent(true);
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
            Mail Send Successfully!!!!
          </Alert>
        </Snackbar>

        {/* <button className="createButton" onClick={handleClickOpen("body")}>
          <span className="addIcon">
            <AddBoxIcon style={{ fontSize: "50px" }} />
          </span>{" "}
          Create
        </button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Personal Mail</DialogTitle>
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
              Send Mail
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default CreateAnnouncement;
