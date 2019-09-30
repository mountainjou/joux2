import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Main</Link>
      <Link to="/login">Loing</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Navbar;
