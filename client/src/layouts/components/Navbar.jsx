import React, { useState, useContext } from "react";
import { AdminShow } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import {
  MDBContainer,
  MDBBox,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";

function NavbarPage() {
  const { navbarItemActive, updateNavbarItemActive } = useContext(AppContext);
  const { logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBContainer>
        <MDBNavbarBrand>
          <MDBBox display="flex">
            <img src="/images/logo.svg" alt="react logo" width="50" />
            <strong className="white-text">SmartCode</strong>
          </MDBBox>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem
              className="mx-2"
              onClick={() => updateNavbarItemActive(0)}
              active={navbarItemActive === 0 ? true : false}
            >
              <MDBNavLink to="/Home">Home</MDBNavLink>
            </MDBNavItem>

            <AdminShow>
              <MDBNavItem
                onClick={() => updateNavbarItemActive(1)}
                active={navbarItemActive === 1 ? true : false}
                className="mx-2"
              >
                <MDBNavLink to="/tickets">Tickes</MDBNavLink>
              </MDBNavItem>
            </AdminShow>
            <AdminShow>
              <MDBNavItem
                onClick={() => updateNavbarItemActive(2)}
                active={navbarItemActive === 2 ? true : false}
                className="mx-2"
              >
                <MDBNavLink to="/users">Users</MDBNavLink>
              </MDBNavItem>
            </AdminShow>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="power-off" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem onClick={logout} href="#!">
                    Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavbarPage;
