import React, { Component } from "react";
import { MDBBox, MDBNavbar, MDBNavbarBrand } from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

class NavbarPage extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Router>
        <MDBNavbar className="fixed-top" color="indigo" dark expand="md">
          <MDBNavbarBrand>
            <MDBBox display="flex">
              <img src="/images/logo.svg" alt="react logo" width="50" />
              <strong className="white-text">SmartCode</strong>
            </MDBBox>
          </MDBNavbarBrand>
        </MDBNavbar>
      </Router>
    );
  }
}

export default NavbarPage;
