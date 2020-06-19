import React from "react";
import { NotLoginNavbar } from "./components";

const main = ({ children }) => {
  return (
    <>
      <NotLoginNavbar />
      <div>{children}</div>
    </>
  );
};

export default main;
