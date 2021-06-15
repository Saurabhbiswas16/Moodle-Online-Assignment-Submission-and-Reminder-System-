import React, { useState, useEffect } from "react";
import UploadFiles from "./UploadFiles";
import axios from "../Axios";
import "./CreateAssignment.css";
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

function CreateAssignment(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [dataSent, setdataSent] = useState(false);
  const [createLabClick, setcreateLabClick] = useState(false);
  const [uploadedfile, setUploadedFile] = useState();
  const [state, setState] = useState({
    teacherId: localStorage.getItem("teacheruser"),
    departmentId: "",
    semesterId: "",
    subjectId: "",
    divisionId: "",
    batchId: "",
    description: "",
    title: "",
    DeadLine: "",
    email: "",
    uploadedTime: new Date().toLocaleDateString(),
    GuidlineFilePath: "",
    driveFileId: "",
  });
  useEffect(() => {
    setState((prevVlaue) => ({
      ...prevVlaue,
      departmentId: props.handleDepartmentDetails.departmentId,
      semesterId: props.handleDepartmentDetails.semesterId,
      subjectId: props.handleDepartmentDetails.subjectId,
      divisionId: props.handleDepartmentDetails.divisionId,
      batchId: props.handleDepartmentDetails.batchId,
    }));
  }, [props]);

  //change
  useEffect(() => {
    if(state.GuidlineFilePath!=="" && state.teacherId!=="" && state.driveFileId){
      axios
          .post("/add", state)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            setdataSent(true);
          })
          .catch((err) => console.log(err));
    }
  }, [state.GuidlineFilePath]) 

  const addUploadedFile = (File) => {
    console.log("from add uploaded files");
    setUploadedFile(File);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(state.DeadLine);
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", uploadedfile);
    console.log(uploadedfile);

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
              // GuidlineFilePath: res.data.webViewLink,
            }));
          });
        console.log("assignment for send", state);
        console.log("after state prints");
        
      });
  };
  // const CreateLab = () => {
  //   setcreateLabClick(true);
  // };
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      teacherId: "",
      departmentId: "",
      semesterId: "",
      subjectId: "",
      divisionId: "",
      batchId: "",
      description: "",
      title: "",
      DeadLine: "",
      email: "",
      uploadedTime: "",
      GuidlineFilePath: "",
      driveFileId: "",
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
  const classes = useStyles();
  return (
    <>
      <Snackbar
        open={dataSent}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Assignment Created Successfully!!!!
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
                value={state.title}
                onChange={handleChange}
                required
                autoComplete="off"
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
                value={state.description}
                style={{ width: "500px" }}
                margin="dense"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="date"
                label="Deadline"
                type="datetime-local"
                name="DeadLine"
                defaultValue={new Date()}
                value={state.DeadLine}
                onChange={handleChange}
                required
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
          <Button onClick={handleSubmit} color="primary">
            Create Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default CreateAssignment;