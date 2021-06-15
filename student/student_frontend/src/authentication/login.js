/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "../Axios";
import "./login.css";
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function login(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [dataSent, setdataSent] = useState(false);
  const [loginmsg, setLoginmsg] = useState("");
  const [data, setdata] = useState({
    email: String,
    password: String,
  });
  const changedData = (event) => {
    const { name, value } = event.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(data)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("student/login", data)
      .then((res) => {
        console.log("hey");
        // const cookies = new Cookies();
        // cookies.set('jwt',res.data.token)
        console.log(res.data);
        // console.log(res.data.token)
        if (res.data.accessToken != undefined)
          localStorage.setItem("token", res.data.accessToken);

        console.log(res.data);
        if (res.data.studentId != undefined)
          localStorage.setItem("studentuser", res.data.studentId);

        if (res.data.user) {
          setloggedIn(true);
          props.setuser(res.data.user);
        } else {
          setloggedIn(false);
          if (!res.data.registered) {
            console.log("register first");
            setLoginmsg("register first");
          } else if (!res.data.verified) {
            console.log("you are not verified!!");
            setLoginmsg("you are not verified!!");
          } else if (!res.data.valid) {
            console.log("username or password invalid");
            setLoginmsg("username or password invalid");
          }
        }
        setdataSent(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseSnack = () => {
    setdataSent(false);
  };
  if (loggedIn) return <Redirect to={"/assignment"} />;
  return (
    <>
      <Snackbar
        open={dataSent}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity="error">
          {loginmsg}
        </Alert>
      </Snackbar>
      <form className="container" onSubmit={handleSubmit}>
        <div className="title">Sign in</div>
        <div className="form-group">
          <TextField
            type="email"
            id="standard-basic"
            label="Email"
            name="email"
            required
            onChange={changedData}
          />
        </div>
        <div className="form-group">
          <TextField
            type="password"
            id="standard-basic"
            label="Password"
            name="password"
            required
            onChange={changedData}
          />
        </div>
        <div className="form-group">
          <button className="button">Login</button>
        </div>
        <div className="form-group">
          <Link exact to={"/resetPassword"} className="link">
            Forgot password?
          </Link>
        </div>
        <div className="form-group">
          Dont have an account?
          <span>
            {" "}
            <Link exact to={"/register"} className="link">
              Create an account
            </Link>{" "}
          </span>
        </div>
      </form>
    </>
  );
}

export default login;
