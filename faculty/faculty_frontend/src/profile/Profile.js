import React, { useState, useEffect } from "react";
import axios from "../Axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0ab4f7",
    color: theme.palette.common.white,
    fontSize: "30px",
    marginTop: "-30px",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Profile(props) {
  const [user, setUser] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    dob: "",
  });
  console.log(props.user);
  useEffect(() => {
    async function fetchProfile() {
      await axios
        .post("/profile/details", { id: localStorage.getItem("teacheruser") })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          // console.log(user)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchProfile();
  }, [props]);
  const classes = useStyles();
  return (
    <>
      <div className="container">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Teacher Profile</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Email
                </StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Firstname
                </StyledTableCell>
                <StyledTableCell align="left">{user.fname}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Middlename
                </StyledTableCell>
                <StyledTableCell align="left">{user.mname}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Lastname
                </StyledTableCell>
                <StyledTableCell align="left">{user.lname}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Date of Birth
                </StyledTableCell>
                <StyledTableCell align="left">{user.dob.slice(0,10)}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default withRouter(Profile);
