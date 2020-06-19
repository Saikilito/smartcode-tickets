import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const SignupForm = (props) => {
  return (
    <MDBContainer>
      <MDBRow center>
        <MDBCol md="7">
          <form onSubmit={props.handleSubmit}>
            <div className="grey-text">
              <MDBInput
                onChange={props.handleDataSignun}
                name="nombre"
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                succes
              />
              <MDBInput
                onChange={props.handleDataSignun}
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
                onChange={props.handleDataSignun}
                name="pass"
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
              <MDBInput
                onChange={props.handleDataSignun}
                name="pass_r"
                label="Confirm your password"
                icon="exclamation-triangle"
                group
                type="password"
                validate
                error="wrong"
                success="right"
              />
            </div>
            <div className="text-center">
              <MDBBtn className="btn-block" color="primary" type="submit">
                Register
              </MDBBtn>
              <Link to="/signin">
                <p className="my-5">Do you already have an account? Sign in</p>
              </Link>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignupForm;
