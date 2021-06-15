import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import DashBoard from "./dashBoard/DashBoard";
import Profile from "./profile/Profile";
import Error from "./Error";
import axios from "./Axios";

//parth
//import ForgotPassword from './authentication/forgotPassword.component';
import Login from "./authentication/login";
import ResetPass from "./authentication/reset_pass";
import Register from "./authentication/Register";
import StudentAssignment from "./studentassignment/StudentAssignment";
function App() {
  const [user, setuser] = useState({});
  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("", config)
      .then((res) => {
        console.log(res.data);
        setuser(res.data);
        // console.log('sdjg')
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setuser({});
  };

  return (
    <>
      {/* <Nav  user= {this.state.user}  setUser = { this.setUser}/> */}
      {localStorage.getItem("studentuser") != "" ? (
        <Navbar user={user} handleLogout={handleLogout} />
      ) : null}

      <Switch>
        <>
          <Route
            exact
            path="/profile"
            component={() => <Profile user={user} />}
          />
          <Route exact path="/dashBoard" component={DashBoard} />
          <Route exact path="/assignment" component={StudentAssignment} />
          <Route path="/error" component={Error} />
          {/* <Route  component={Error}/> */}
          {/* <Redirect to={"/error"} /> */}

          <Route exact path="/" component={() => <Login setuser={setuser} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/resetPassword" component={ResetPass} />
        </>
      </Switch>
    </>
  );
}

export default App;
