/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useContext } from "react";
// import {teacherid} from "../context/teacheridcontext.js"
import { Redirect, Link } from "react-router-dom";
import axios from "../Axios";
import "./login.css";
import Button from "@material-ui/core/Button";
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function login(props) {                                                                                                                                                                                                           
  const [loggedIn, setloggedIn] = useState(false);
  const [dataSent, setdataSent] = useState(false);
  const [loginmsg, setLoginmsg] = useState("");
  // const [teacherid, setTeacherid] = useContext(teacherid);
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
      .post("auth/login", data)
      .then((res) => {
        console.log("hey");
        // const cookies = new Cookies();
        // cookies.set('jwt',res.data.token)
        console.log(res.data);
        // console.log(res.data.token)
        if (res.data.accessToken != undefined) {
          localStorage.setItem("token", res.data.accessToken);
          setloggedIn(true);
        }
        if (res.data.teacherid != undefined)
          localStorage.setItem("teacheruser", res.data.teacherid);
        if (res.data.loginmsg != undefined) {
          setdataSent(true);
          setLoginmsg(res.data.loginmsg);
        }
        // setTeacherid(res.data.teacherid)

        props.setuser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseSnack = () => {
    setdataSent(false);
  };
  if (localStorage.getItem("teacheruser") != undefined)
    return <Link to={"/dashBoard"} />;
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
