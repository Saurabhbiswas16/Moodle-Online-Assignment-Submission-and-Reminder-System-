import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
//import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import MailRoundedIcon from "@material-ui/icons/MailRounded";

//for set to local storage or session storage
import ReactSession from "react-client-session";

import "./Navbar.css";
function Navbar(props) {
  const Logout = () => {
    localStorage.setItem("teacheruser", "");
    props.handleLogout();
  };

  return (
    <div className="navbar shadow">
      {/* <NavLink exact to='/'  activeClassName='navbar_link'>
        <span><AssignmentIcon/></span>Assignment    
        </NavLink> */}
      <NavLink exact to="/profile" activeClassName="navbar_link">
        <span>
          <PersonIcon />
        </span>{" "}
        Profile
      </NavLink>
      <NavLink exact to="/dashBoard" activeClassName="navbar_link">
        <span>
          <DashboardIcon />
        </span>{" "}
        DashBoard
      </NavLink>
      <NavLink exact to="/announcement" activeClassName="navbar_link">
        <span>
          <MailRoundedIcon />
        </span>{" "}
        Announcement
      </NavLink>
      <NavLink exact to="/teacherAssignment" activeClassName="navbar_link">
        <span>
          <AssignmentIcon />
        </span>{" "}
        Assignment
      </NavLink>
      <NavLink exact to="/" onClick={Logout} activeClassName="navbar_link">
        <span>
          <ExitToAppOutlinedIcon />
        </span>{" "}
        Logout
      </NavLink>
      {/* <NavLink exact to="/error" activeClassName="navbar_link">
        <span>
          <ExitToAppOutlinedIcon />
        </span>{" "}
        Error
      </NavLink> */}
      {/* <Redirect to={'/error'} /> */}
    </div>
  );
}

export default Navbar;
