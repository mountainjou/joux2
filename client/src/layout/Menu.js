import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const Menu = ({ auth: { isAuthenticated, loading }, logout }) => {
  // 인증된 사용자 접속시 나타나는 메뉴
  const authLinks = (
    <Nav>
      <NavItem>
        <NavLink href="/uploadholders/">명부 업로드</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/vote/">투표</NavLink>
      </NavItem>
      <NavItem>
<<<<<<< HEAD
        <NavLink href="/Bulletin/">vote</NavLink>
      </NavItem>
      <NavItem>
=======
<<<<<<< Updated upstream
=======
        <NavLink href="/Bulletin/">보드</NavLink>
      </NavItem>
      <NavItem>
>>>>>>> Stashed changes
>>>>>>> Kihong
=======
        <NavLink href="/Bulletin/">보드</NavLink>
      </NavItem>
      <NavItem>
>>>>>>> Kihong
        <Button color="link" onClick={logout}>
          로그아웃
        </Button>
      </NavItem>
    </Nav>
  );

  // 인증되지 않은 사용자 접속시 나타나는 메뉴
  const guestLinks = (
    <Nav>
      <NavItem>
        <NavLink href="/login/">로그인</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/register">회원가입</NavLink>
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
