import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const Menu = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <Nav>
      <NavItem>
        <NavLink href="/uploadholders/">uploadholders</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/vote/">vote</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Bulletin/">vote</NavLink>
      </NavItem>
      <NavItem>
        <Button color="link" onClick={logout}>
          Logout
        </Button>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav>
      <NavItem>
        <NavLink href="/login/">Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/register">Register</NavLink>
      </NavItem>
    </Nav>
  );

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">JouJou</NavbarBrand>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Navbar>
  );
};

Menu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Menu);
