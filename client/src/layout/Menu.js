import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const Menu = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">JouJou</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/login/">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Menu;
