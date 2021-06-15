import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

function Protectrouteteacher({
  isAuth: isAuth,
  Component: Component,
  ...rest
}) {
  let location = useLocation();
  console.log(isAuth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth)
          return <Component teacherid={localStorage.getItem("teacheruser")} />;
        else
          return <Redirect to={{ pathname: "/", state: { from: location } }} />;
      }}
    />
  );
}

export default Protectrouteteacher;
