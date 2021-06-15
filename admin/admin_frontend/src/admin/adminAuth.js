/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "../Axios";
import { TextField } from "@material-ui/core";

function adminAuth() {
  const [loggedIn, setloggedIn] = useState(false);
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
      .post("admin/login", data)
      .then((res) => {
        console.log("hey");
        // const cookies = new Cookies();
        // cookies.set('jwt',res.data.token)
        console.log(res);
        // console.log(res.data.token)

        if (res.data.valid) {
          // localStorage.setItem('adminLoggedIn',true)
          setloggedIn(true);
        } else {
          setloggedIn(false);
          // localStorage.setItem('adminLoggedIn',false)
          console.log("Username or password is invalid!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loggedIn) return <Redirect to={"/adminPanel"} />;
  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="title">Sign in</div>
        <div className="form-group">
          <TextField
            type="text"
            id="standard-basic"
            label="Username"
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
      </form>
    </>
  );
}

export default adminAuth;
