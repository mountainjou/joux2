import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = ({
  auth: { user, isAuthenticated, loading, currentAccount },
  logout
}) => {
  // const [web3Wallet, setWeb3wallet] = React.useState(null);

  // 인증된 사용자 접속시 나타나는 메뉴
  // user.role 값이 nomal 혹은 holder인 경우에는 명부 업로드 및 토큰 발행 기능 접근을 제한한다.
  const authLinks = role =>
    role &&
    ((role === 'nomal') | (role === 'holder') ? (
      <ul className='nav'>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/receivetoken/'>
            토큰 수령
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/vote/'>
            투표
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/Board/'>
            게시판
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/bulletin/'>
            전자공시
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/myaccount/'>
            내 정보
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/myaccount'>
            {currentAccount}
          </a>
        </li>
        <li className='nav-item'>
          <button type='button' className='btn btn-dark' onClick={logout}>
            로그아웃
          </button>
        </li>
      </ul>
    ) : (
      <ul className='nav'>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/uploadholders/'>
            명부 업로드
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/publishtoken/'>
            토큰 발행
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/receivetoken/'>
            토큰 수령
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/vote/'>
            투표
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/mkvote/'>
            투표 작성
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/Board/'>
            게시판
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/bulletin/'>
            전자공시
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/makevote/'>
            투표 만들기
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/myaccount/'>
            내 정보
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-light' href='/myaccount'>
            {currentAccount}
          </a>
        </li>
        <li className='nav-item'>
          <button type='button' className='btn btn-dark' onClick={logout}>
            로그아웃
          </button>
        </li>
      </ul>
    ));

  // 인증되지 않은 사용자 접속시 나타나는 메뉴
  const guestLinks = (
    <ul className='nav'>
      <li>
        <a className='nav-link text-light' href='/login/'>
          로그인
        </a>
      </li>
      <li>
        <a className='nav-link text-light' href='/register'>
          회원가입
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
      <a className='navbar-brand' href='/'>
        주주
      </a>
      {!loading && (
        <Fragment>
          {isAuthenticated ? authLinks(user.role) : guestLinks}
        </Fragment>
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
