import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AddIcon from '@material-ui/icons/Add';

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
      <NavLink exact to="/adminPanel" activeClassName="navbar_link">
        <span>
          <PersonIcon />
        </span>{" "}
        All Request
      </NavLink>
      <NavLink exact to="/updateBatch" activeClassName="navbar_link">
        <span>
          <DashboardIcon />
        </span>{" "}
        Update Batch
      </NavLink>
     
      <NavLink exact to="/createDepartment" activeClassName="navbar_link">
        <span>
          <AddIcon />
        </span>{" "}
        Ceate Department
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
