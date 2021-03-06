import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    password2: '',
    username: '',
    corpId: '',
    corpName: '',
    isNomalUser: 'true'
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };
  const {
    email,
    password,
    password2,
    username,
    isNomalUser,
    corpName,
    corpId
  } = values;

  const onSubmit = async e => {
    e.preventDefault();
    // 만약 password와 password2가 값이 다르면 setAlert 액션을 실행한다.
    if (password !== password2) {
      setAlert('비밀번호가 일치하지 않습니다', 'danger');
    } else {
      // password와 password2가 값이 같다면 register 액션을 실행한다.
      register({ email, password, username, corpName, corpId });
    }
  };

  // 일반회원 가입 양식
  const holdersUser = (
    <Fragment>
      <div className='form-group'>
        {/* <label htmlFor="email">이메일</label> */}
        <input
          className='form-control'
          type='email'
          name='email'
          placeholder='이메일을 입력하세요'
          aria-describedby='emailHelper'
          autoComplete='username'
          id='email'
          value={values.email}
          onChange={handleChange('email')}
        />
        <small id='emailHelper' className='form-text text-muted'>
          가입 인증을 위해 이메일을 발송합니다. 본인 확인 가능한 올바른 이메일을
          입력하세요
        </small>
      </div>
      <div className='form-group'>
        {/* <label htmlFor="password">Password</label> */}
        <input
          className='form-control'
          type='password'
          name='password'
          id='password'
          placeholder='패스워드를 입력하세요'
          autoComplete='new-password'
          value={values.password}
          aria-describedby='passwordHelper'
          onChange={handleChange('password')}
        />
        <small id='passwordHelper' className='form-text text-muted'>
          영대/소문자, 숫자, 특수기호 관계 없이 8자 이상 입력하세요.
        </small>
      </div>
      <div className='form-group'>
        {/* <label htmlFor="password2">Confirm Password</label> */}
        <input
          className='form-control'
          type='password'
          name='password2'
          id='password2'
          placeholder='패스워드 확인을 위해 한 번 더 입력하세요'
          autoComplete='new-password'
          value={values.password2}
          onChange={handleChange('password2')}
        />
      </div>
      <div className='form-group'>
        {/* <label htmlFor="username">사용하실 닉네임을 입력해주세요</label> */}
        <input
          className='form-control'
          type='name'
          name='username'
          id='username'
          placeholder='사용자 이름을 입력해주세요'
          aria-describedby='usernameHelper'
          value={values.username}
          onChange={handleChange('username')}
        />
        <small id='usernameHelper' className='form-text text-muted'></small>
      </div>
    </Fragment>
  );

  // 법인회원 가입 양식
  const corporationUser = (
    <Fragment>
      <div className='form-group'>
        {/* <label htmlFor="email">이메일</label> */}
        <input
          className='form-control'
          type='email'
          name='email'
          placeholder='이메일을 입력하세요'
          aria-describedby='emailHelper'
          autoComplete='username'
          id='email'
          value={values.email}
          onChange={handleChange('email')}
        />
        <small id='emailHelper' className='form-text text-muted'>
          가입 인증을 위해 이메일을 발송합니다. 본인 확인 가능한 올바른 이메일을
          입력하세요
        </small>
      </div>
      <div className='form-group'>
        {/* <label htmlFor="password">Password</label> */}
        <input
          className='form-control'
          type='password'
          name='password'
          id='password'
          placeholder='패스워드를 입력하세요'
          autoComplete='new-password'
          value={values.password}
          aria-describedby='passwordHelper'
          onChange={handleChange('password')}
        />
        <small id='passwordHelper' className='form-text text-muted'>
          영대/소문자, 숫자, 특수기호 관계 없이 8자 이상 입력하세요.
        </small>
      </div>
      <div className='form-group'>
        {/* <label htmlFor="password2">Confirm Password</label> */}
        <input
          className='form-control'
          type='password'
          name='password2'
          id='password2'
          placeholder='패스워드 확인을 위해 한 번 더 입력하세요'
          autoComplete='new-password'
          value={values.password2}
          onChange={handleChange('password2')}
        />
      </div>
      <div className='form-group'>
        {/* <label htmlFor="username">사용하실 닉네임을 입력해주세요</label> */}
        <input
          className='form-control'
          type='name'
          name='username'
          id='username'
          placeholder='사용자 이름을 입력해주세요'
          aria-describedby='usernameHelper'
          value={values.username}
          onChange={handleChange('username')}
        />
        <small id='usernameHelper' className='form-text text-muted'></small>
      </div>
      <hr />
      <div className='form-group'>
        {/* <label htmlFor="username">사용하실 닉네임을 입력해주세요</label> */}
        <input
          className='form-control'
          type='name'
          name='corpName'
          id='corpName'
          placeholder='법인 이름을 입력해주세요'
          aria-describedby='corpnameHelper'
          value={values.corpName}
          onChange={handleChange('corpName')}
        />
        <small id='corpName' className='form-text text-muted'></small>
      </div>
      <div className='form-group'>
        {/* <label htmlFor="username">사용하실 닉네임을 입력해주세요</label> */}
        <input
          className='form-control'
          type='name'
          name='corpId'
          id='corpId'
          placeholder='법인 등록번호를 입력해주세요'
          aria-describedby='corpIdHelper'
          value={values.corpId}
          onChange={handleChange('corpId')}
        />
        <small id='corpId' className='form-text text-muted'></small>
      </div>
    </Fragment>
  );

  // 인증이 되었으면 메인페이지로 리다이렉트
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  console.log(values);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <form onSubmit={e => onSubmit(e)}>
        <h2>주주 회원가입</h2>
        <div className='btn-group' style={{ width: '100%' }}>
          <button
            type='button'
            name='userType'
            className={`btn ${
              isNomalUser === 'true' ? 'btn-primary' : 'btn-secondary'
            }`}
            autoComplete='off'
            value='true'
            onClick={handleChange('isNomalUser')}
          >
            주주 회원
          </button>
          <button
            type='button'
            name='userType'
            className={`btn ${
              isNomalUser !== 'true' ? 'btn-primary' : 'btn-secondary'
            }`}
            value='false'
            onClick={handleChange('isNomalUser')}
          >
            법인 회원
          </button>
        </div>
        <div style={{ marginTop: 10 }}></div>
        {isNomalUser === 'true' ? holdersUser : corporationUser}
        <div>
          <button type='submit' className='btn btn-primary'>
            가입하기
          </button>
        </div>

        <Link to='/login' variant='body2'>
          {'이미 주주 회원이신가요? 이 곳으로 오세요'}
        </Link>
      </form>
      <Alert />
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
