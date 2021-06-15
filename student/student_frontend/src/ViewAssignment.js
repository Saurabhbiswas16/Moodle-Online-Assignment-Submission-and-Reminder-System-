import React, { useEffect, useState } from "react";
import axios from "./Axios";
import { useParams } from "react-router-dom";
import UploadFiles from "./UploadFiles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ViewAssignment(props) {
  //   const [id, setid] = useState(props.Assignmentid);
  let id = props.Assignmentid;

  const [Assignment, setAssignment] = useState({});
  const [DeadLine, setDeadLine] = useState("");
  const [filepath, setFilepath] = useState("");
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("body");
  const [dataSent, setdataSent] = useState(false);
  const [state, setState] = useState({});
  const [uploadedfile, setUploadedFile] = useState();
  const addUploadedFile = (UploadedFile) => {
    console.log(UploadedFile);
    setFilepath(UploadedFile);
    setUploadedFile(UploadedFile);
  };

  // this is called when id changes
  useEffect(() => {
    const getassignment = () => {
      const assignmentid = { assignmentid: id };
      var assignmentres = axios
        .post("/getassignment", assignmentid)
        .then((res) => {
          setAssignment(res.data);
          // console.log(res.data);

          setDeadLine(new Date(res.data.DeadLine));
        });
    };
    getassignment();
    setOpen(true);
  }, [id]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();

    console.log(uploadedfile);
    data.append("file", uploadedfile);

    await axios
      .post("/googledrive/createfile", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        console.log(res.data);
        await setState((prevState) => ({
          ...prevState,
          driveFileId: res.data.id,
        }));
        await axios
          .post("/googledrive/getviewlink", { id: res.data.id })
          .then(async (res) => {
            console.log(res.data.webViewLink);
            await setState((prevState) => ({
              ...prevState,
              GuidlineFilePath: res.data.webViewLink,
            }));
          });
        console.log("assignment for send", state);
        console.log("after state prints");
      });

    const assignmentDetails = {
      assignment: {
        studentId: localStorage.getItem("studentuser"),
        assignmentId: id,
        submissionFilePath: state.GuidlineFilePath,
        driveFileId: state.driveFileId,
      },
    };
    setdataSent(true);
    await axios
      .post("/setassignment", assignmentDetails)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setdataSent(true);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseSnack = () => {
    setdataSent(false);
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    props.setViewassignment(false);
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
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        open={dataSent}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Your Assignment Uploaded Successfully!!!!
        </Alert>
      </Snackbar>

      {/* <button className="createButton" onClick={handleClickOpen("body")}>
        <span className="addIcon">
          <AddBoxIcon style={{ fontSize: "50px" }} />
        </span>{" "}
        View
      </button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Assignment</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className="form-group">
              {" "}
              <TextField
                id="standard-basic"
                label="Title"
                type="text"
                name="title"
                value={Assignment.title}
                contentEditable="false"
              />{" "}
            </div>
            <div className="form-group">
              <TextField
                type="text"
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={3}
                name="description"
                value={Assignment.description}
                style={{ width: "500px" }}
                margin="dense"
                contentEditable="false"
              />
            </div>
            {/* {Assignment.DeadLine} */}
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Deadline"
                type="text"
                value={new Date(Assignment.DeadLine)}
                contentEditable="false"
              />
              {/* <TextField
                id="date"
                label="Deadline"
                type="datetime-local"
                name="DeadLine"
                defaultValue={new Date()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                contentEditable="false"
              /> */}
            </div>
            <div className="form-group">
              <p style={{ display: "inline" }}>assignment file:</p>
              <button className="btn btn-success">
                <a
                  id="download"
                  target="_blank"
                  href={Assignment.GuidlineFilePath}
                  style={{ color: "white" }}
                >
                  view
                </a>
              </button>
            </div>
            <div className="form-group">
              <UploadFiles addUploadedFile={addUploadedFile} />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload Assignment
          </Button>
        </DialogActions>
      </Dialog>

      {/* <div>title : {Assignment.title}</div>
      <div>Description : {Assignment.description}</div>
      <div>deadLine : {DeadLine.toString()}</div>
      <UploadFiles addUploadedFile={addUploadedFile}/>
      <button onClick={handleUpload}>upload</button> */}
    </div>
  );
}

export default ViewAssignment;