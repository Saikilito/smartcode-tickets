import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminShow = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    window.localStorage.clear();
    return <Redirect to={"/"} />;
  }

  if (user.rol !== "admin") {
    return <></>;
  }

  return <> {children} </>;
};

export default AdminShow;
