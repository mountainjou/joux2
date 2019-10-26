import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import Web3 from "web3";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const Nav = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [web3Wallet, setWeb3wallet] = React.useState(null);

  // 연결된 지갑 불러오기
  useEffect(() => {
    web3.eth.getAccounts().then(function(result) {
      setWeb3wallet(result);
    });
  }, []);

  // 인증된 사용자 접속시 나타나는 메뉴
  const authLinks = (
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link text-light" href="/uploadholders/">
          명부 업로드
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/publishtoken/">
          토큰 발행
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/vote/">
          투표
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/bulletin/">
          보드
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/myaccount/">
          내 정보
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light">{web3Wallet}</a>
      </li>
      <li className="nav-item">
        <button type="button" className="btn btn-dark" onClick={logout}>
          로그아웃
        </button>
      </li>
    </ul>
  );

  // 인증되지 않은 사용자 접속시 나타나는 메뉴
  const guestLinks = (
    <ul className="nav">
      <li>
        <a className="nav-link text-light" href="/login/">
          로그인
        </a>
      </li>
      <li>
        <a className="nav-link text-light" href="/register">
          회원가입
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="/">
        JouJou
      </a>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
