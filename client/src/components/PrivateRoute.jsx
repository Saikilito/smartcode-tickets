import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtUnexpired } from "../helpers";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);
  const { isAdmin } = props;

  const token = window.localStorage.getItem("__jw__");
  if (token) {
    let expired = jwtUnexpired(token);

    if (expired) {
      //console.log("expired?", true);
      window.localStorage.clear();
      return <Redirect to={"/signin"} />;
    }
  }

  if (!user && token) {
    return <Redirect to={"/signin"} />;
  }

  if (!user && !token) {
    window.localStorage.clear();
    return <Redirect to={"/signin"} />;
  }

  if (isAdmin && user.rol !== "admin") {
    window.localStorage.clear();
    return <Redirect to={"/signin"} />;
  }

  return (
    <>
      <Route {...props} />
    </>
  );
};

export default PrivateRoute;
