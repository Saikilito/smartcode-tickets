import React from "react";
import { Navbar } from "./components";

const main = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container-fluid px-3 py-5">{children}</div>
    </>
  );
};

export default main;
