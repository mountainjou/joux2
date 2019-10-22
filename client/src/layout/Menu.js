import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

const Menu = ({ auth: { isAuthenticated, loading }, logout }) => {
  // 인증된 사용자 접속시 나타나는 메뉴
  const authLinks = (
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link text-light" href="/uploadholders/">명부 업로드</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/vote/">투표</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/bulletin/">보드</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/myaccount/">내 정보</a>
      </li>
      <li className="nav-item">
        <button type="button" className="btn btn-outline-primary" color="link" onClick={logout}>
          로그아웃
        </button>
      </li>
    </ul>
  );

  // 인증되지 않은 사용자 접속시 나타나는 메뉴
  const guestLinks = (
    <ul className="nav">
      <li>
        <a className="nav-link" href="/login/">로그인</a>
      </li>
      <li>
        <a className="nav-link" href="/register">회원가입</a>
      </li>
    </ul>
  );

  return (
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <a class="navbar-brand" href="/">JouJou</a>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
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
