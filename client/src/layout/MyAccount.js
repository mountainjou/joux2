import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Spinner from '../components/Spinner';
import Alert from '../Alert';
import { setAlert } from '../actions/alert';

const MyAccount = ({ setAlert, auth: { user, currentAccount, loading } }) => {
  const [values, setValues] = React.useState({
    redirectRegisterCorporation: false
  });

  console.log(user);

  const { redirectRegisterCorporation } = values;

  const registerCorporation = () => {
    console.log('기업 회원 등록 페이지 띄우기');
    setValues({ redirectRegisterCorporation: true });
  };

  // 지갑 연동
  const saveWallet = async () => {
    console.log(currentAccount);
    const url = '/api/users/registerwallet';
    const data = {
      whitelistWallet: currentAccount,
      email: user.email
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await Axios.post(url, data, config)
      .then(result => {
        console.log(result);
        setAlert(result.data.msg, result.data.alertType);
      })
      .catch(err => {
        console.log(err);
      });
    // 5sec 뒤에 브라우저 새로고침
    setTimeout(() => window.location.reload(), 5000);
  };

  if (redirectRegisterCorporation) {
    return <Redirect to='/registercorp' />;
  }

  return loading === null ? (
    <Spinner />
  ) : (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>내 정보</h2>
      <br />
      <form>
        {/* 사용자 이름 항목 */}
        <div className='form-group row'>
          <label
            htmlFor='userName'
            className='col-sm-3 col-form-label border-right'
          >
            사용자 이름
          </label>
          <div className='col-sm-9'>
            <input
              type='text'
              disabled
              className='form-control-plaintext'
              id='userName'
              placeholder={user.username}
            />
          </div>
        </div>
        {/* 이메일 항목 */}
        <div className='form-group row'>
          <label
            htmlFor='userEmail'
            className='col-sm-3 border-right col-form-label '
          >
            이메일
          </label>
          <div className='col-sm-9'>
            <input
              type='text'
              disabled
              className='form-control-plaintext'
              id='userEmail'
              placeholder={user.email}
            />
          </div>
        </div>

        {/* <div>유저네임 : {user.username}</div>
      <div>이메일 : {user.email}</div> */}
        {(user.role === 'corp') | (user.role === 'certCorp') ? (
          <div>
            <div className='form-group row'>
              <label
                htmlFor='corpName'
                className='col-sm-3 border-right col-form-label '
              >
                회사명
              </label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  disabled
                  className='form-control-plaintext'
                  id='corpName'
                  placeholder={user.corporation.name}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label
                htmlFor='corpId'
                className='col-sm-3 border-right col-form-label '
              >
                법인 번호
              </label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  disabled
                  className='form-control-plaintext'
                  id='corpId'
                  placeholder={user.corporation.corpId}
                />
              </div>
            </div>
            {user.role === 'certCorp' ? (
              <div className='form-group row'>
                <label
                  htmlFor='certCorp'
                  className='col-sm-3 border-right col-form-label '
                >
                  법인 인증
                </label>
                <div className='col-sm-9'>
                  <input
                    type='text'
                    disabled
                    className='form-control-plaintext'
                    id='certCorp'
                    placeholder='인증된 법인 기업'
                  />
                </div>
              </div>
            ) : (
              <div className='form-group row'>
                <label
                  htmlFor='certCorp'
                  className='col-sm-3 border-right col-form-label '
                >
                  법인 인증
                </label>
                <div className='col-sm-9'>
                  <input
                    type='text'
                    disabled
                    className='form-control-plaintext'
                    id='certCorp'
                    placeholder='인증받지 않은 법인'
                  />
                </div>
              </div>
            )}
          </div>
        ) : null}
        <div>등록된 지갑 주소</div>
        {user.whitelistWallets ? (
          <div>
            {user.whitelistWallets.map(address => (
              <li style={{ color: 'gray' }} key={address}>
                {address}
              </li>
            ))}

            <br />
            <button
              type='button'
              className='btn btn-primary'
              onClick={saveWallet}
            >
              현재 접속된 지갑 주소 추가 등록
            </button>
          </div>
        ) : (
          <button
            type='button'
            className='btn btn-primary'
            onClick={saveWallet}
          >
            현재 접속된 지갑 주소 등록
          </button>
        )}
      </form>
      <Alert />
    </div>
  );
};

MyAccount.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(MyAccount);
