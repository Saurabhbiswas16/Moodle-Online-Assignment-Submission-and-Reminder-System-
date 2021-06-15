import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { teacherid } from "./context/teacheridcontext.js";

import Navbar from "./navbar/Navbar";
import DashBoard from "./dashBoard/DashBoard";
import Profile from "./profile/Profile";
import Announcement from "./announcement/Announcement";
import TeacherAssignment from "./Teacher/TeacherAssignment";
import Error from "./Error";
import axios from "./Axios";
//parth
//import ForgotPassword from './authentication/forgotPassword.component';
import Login from "./authentication/login";
//import Register from './authentication/register.component';
// import ResetPassword from './authentication/resetPassword.component';
import ResetPass from "./authentication/reset_pass";
import Register from "./authentication/Register";
import Protectrouteteacher from "./protectroute/Protectrouteteacher";
import ViewPdf from "./pdfviewer/ViewPdf";
let isAuth = localStorage.getItem("teacheruser") != null;
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
function App() {
  const [user, setuser] = useState({});
  const [teacherid, setTeacherid] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // axios
    //   .get("", config)
    //   .then((res) => {
    //     console.log("teacher id" + res.data._id);

    //     localStorage.setItem("teacheruser", res.data._id);
    //     timeout(100);
    //     console.log(localStorage.getItem("teacheruser"));
    //     if (localStorage.getItem("teacheruser") != null)
    //       setuser({ userid: localStorage.getItem("teacheruser") });
    //     // console.log('sdjg')
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if (localStorage.getItem("teacheruser") != null)
      setuser({ teacherid: localStorage.getItem("teacheruser") });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setuser({});
  };

  return (
    <>
      {/* <Nav  user= {this.state.user}  setUser = { this.setUser}/> */}

      {localStorage.getItem("teacheruser") === null ? null : (
        <Navbar user={user} handleLogout={handleLogout} />
      )}

      {/* <teacherid.provider value={[teacherid, setTeacherid]}> */}
      <Switch>
        {/* <Protectrouteteacher
          exact
          path="/profile"
          Component={Profile}
          isAuth={isAuth}
        />
        <Protectrouteteacher
          exact
          path="/dashBoard"
          component={DashBoard}
          isAuth={isAuth}
        />
        <Protectrouteteacher
          exact
          path="/announcement"
          component={Announcement}
          isAuth={isAuth}
        />
        <Protectrouteteacher
          exact
          path="/teacherAssignment"
          component={TeacherAssignment}
          isAuth={isAuth}
        />
        <Protectrouteteacher path="/error" component={Error} isAuth={isAuth} /> */}
        {localStorage.getItem("teacheruser") !== null ? (
          <>
            <Route
              exact
              path="/profile"
              component={() => <Profile teacherid={user.teacherid} />}
            />

            <Route exact path="/dashBoard" component={DashBoard} />
            <Route exact path="/announcement" component={Announcement} />
            <Route
              exact
              path="/teacherAssignment"
              component={TeacherAssignment}
            />
            {/* <Route path="/*" component={Error} /> */}
          </>
        ) : (
          <>
            <Route
              exact
              path="/"
              component={() => <Login setuser={setuser} />}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/resetPassword" component={ResetPass} />
          </>
        )}
      </Switch>
    </>
  );
}

export default App;
