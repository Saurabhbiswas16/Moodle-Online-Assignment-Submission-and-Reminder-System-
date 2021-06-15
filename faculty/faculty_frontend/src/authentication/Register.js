import React, { useEffect, useState } from "react";
import axios from "../Axios";
import { Redirect, Link } from "react-router-dom";
import {
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./Register.css";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Register() {
  const [signup, setsignup] = useState({
    fname: "",
    mname: "",
    lname: "",
    departmentId: "",
    semesterId: "",
    dob: "",
    email: "",
    password: "",
  });
  const [department, setdepartment] = useState([]);
  const [semester, setsemester] = useState([]);
  const [registered, setregistered] = useState(false);
  const [dataSent, setdataSent] = useState(false);
  const [registrationmsg, setRegistrationmsg] = useState("");
  useEffect(() => {
    async function fetchDepartmentDetails() {
      const req = await axios.get("/departmentDetails/department");
      console.log(req.data);
      setdepartment(req.data);
    }
    fetchDepartmentDetails();
  }, []);

  const callSemester = async (event) => {
    const { name, value } = event.target;
    setsignup((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    const temp = { deptid: value };
    const req = await axios.post("/departmentDetails/semester", temp);
    setsemester(req.data);
  };

  const updateSignUp = (event) => {
    const { value, name } = event.target;
    setsignup((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const signUpSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("auth/register", signup)
      .then((res) => {
        console.log(res);
        setdataSent(true);
        setRegistrationmsg(res.data);
        if (res.status == 200) {
          setregistered(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(signup);
    setsignup({});
  };
  const handleCloseSnack = () => {
    setdataSent(false);
  };
  const classes = useStyles();

  return (
    <>
      {registered ? (
        <Redirect to={"/"} />
      ) : (
        <>
          <Snackbar
            open={dataSent}
            autoHideDuration={4000}
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnack} severity="error">
              {registrationmsg}
            </Alert>
          </Snackbar>
          <form className="container" onSubmit={signUpSubmit}>
            <div className="title">Sign up</div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="First name"
                type="text"
                name="fname"
                value={signup.fname}
                onChange={updateSignUp}
                required
              />{" "}
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Last name"
                type="text"
                name="mname"
                value={signup.mname}
                onChange={updateSignUp}
                required
              />{" "}
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Middle name"
                type="text"
                name="lname"
                value={signup.lname}
                onChange={updateSignUp}
                required
              />{" "}
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                name="email"
                value={signup.email}
                onChange={updateSignUp}
                required
                autoComplete="off"
              />{" "}
            </div>

            <div className="form-group">
              {" "}
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                name="password"
                value={signup.password}
                onChange={updateSignUp}
                required
                autoComplete="off"
              />{" "}
            </div>

            <div className="form-group">
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  onChange={callSemester}
                  className={classes.selectEmpty}
                  name="departmentId"
                >
                  {department.map((data, index) => (
                    <MenuItem value={data._id}>{data.deptName}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select Department</FormHelperText>
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">
                  Semester
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  onChange={updateSignUp}
                  className={classes.selectEmpty}
                  name="semesterId"
                >
                  {semester.map((data, index) => (
                    <MenuItem value={data._id}>{data.sem}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select Semester</FormHelperText>
              </FormControl>
            </div>
            <div className="form-group">
              <TextField
                id="date"
                label="Birthday"
                type="date"
                name="dob"
                defaultValue={new Date()}
                onChange={updateSignUp}
                required
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="form-group">
              <button className="button">Submit</button>
            </div>

            <div className="form-group">
              Have an account?
              <span>
                {" "}
                <Link exact to={"/"} className="link">
                  Sign in
                </Link>{" "}
              </span>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default Register;
