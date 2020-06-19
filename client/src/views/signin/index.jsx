import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "../../helpers";
import { MDBRow, MDBCol } from "mdbreact";
import { NotLogin } from "../../layouts";
import { LeftContainer, RightContainer } from "./components";

const Signin = () => {
  const { user, loginToken } = useContext(AuthContext);
  const token = window.localStorage.getItem("__jw__");

  if (!user && token) {
    const goodDecoded = jwtDecode(token);
    if (goodDecoded) {
      loginToken(goodDecoded);
    }
  }
  if (user) {
    return <Redirect to={"/home"} />;
  }

  return (
    <NotLogin>
      <MDBRow className="no-gutters">
        <MDBCol md="5">
          <LeftContainer />
        </MDBCol>
        <MDBCol md="7">
          <RightContainer />
        </MDBCol>
      </MDBRow>
    </NotLogin>
  );
};

export default Signin;
