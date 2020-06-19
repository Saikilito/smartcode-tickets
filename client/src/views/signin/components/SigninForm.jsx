import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const SigninForm = (props) => {
  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol md="7">
          <form name="signinForm" onSubmit={props.handleSubmit}>
            <div className="grey-text">
              <MDBInput
                onChange={props.handleDataSignin}
                name="mail"
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                onChange={props.handleDataSignin}
                name="pass"
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn className="btn-block" color="primary" type="submit">
                Login
              </MDBBtn>
              <Link to="/signup">
                <p className="my-5">Don't you have an account? Sign up</p>
              </Link>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SigninForm;
