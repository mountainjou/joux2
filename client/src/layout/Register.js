import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
import Alert from "../Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    password2: "",
    username: ""
    // idnum: ""
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password, password2, username } = values;

  const onSubmit = async e => {
    e.preventDefault();
    // 만약 password와 password2가 값이 다르면 setAlert 액션을 실행한다.
    if (password !== password2) {
      setAlert("Password do not match", "negative");
    } else {
      // password와 password2가 값이 같다면 register 액션을 실행한다.
      register({ email, password, username });
    }
  };

  // 인증이 되었으면 메인페이지로 리다이렉트
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <form onSubmit={e => onSubmit(e)}>
        <h2>주주 회원가입</h2>
        <div className="form-group">
          {/* <label htmlFor="email">이메일</label> */}
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            aria-describedby="emailHelper"
            autoComplete="username"
            id="email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <small id="emailHelper" class="form-text text-muted">
            가입 인증을 위해 이메일을 발송합니다. 본인 확인 가능한 올바른
            이메일을 입력하세요
          </small>
        </div>
        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="패스워드를 입력하세요"
            autoComplete="new-password"
            value={values.password}
            aria-describedby="passwordHelper"
            onChange={handleChange("password")}
          />
          <small id="passwordHelper" class="form-text text-muted">
            영대/소문자, 숫자, 특수기호 관계 없이 8자 이상 입력하세요.
          </small>
        </div>
        <div className="form-group">
          {/* <label htmlFor="password2">Confirm Password</label> */}
          <input
            className="form-control"
            type="password"
            name="password2"
            id="password2"
            placeholder="패스워드 확인을 위해 한 번 더 입력하세요"
            autoComplete="new-password"
            value={values.password2}
            onChange={handleChange("password2")}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="username">사용하실 닉네임을 입력해주세요</label> */}
          <input
            className="form-control"
            type="name"
            name="username"
            id="username"
            placeholder="사용자 이름을 입력해주세요"
            aria-describedby="usernameHelper"
            value={values.username}
            onChange={handleChange("username")}
          />
          <small id="usernameHelper" class="form-text text-muted">
            중복사용이 금지됩니다
          </small>
        </div>
        {/* <div className="form-group">
          <label for="idnum">주민등록번호를 입력해주세요( - 제외)</label>
          <input
            className="form-control"
            type="text"
            name="idnum"
            id="idnum"
            value={values.idnum}
            onChange={handleChange("idnum")}
          />
        </div> */}

        <div>
          <button type="submit" className="btn btn-primary">
            가입하기
          </button>
        </div>

        <Link to="/login" variant="body2">
          {"이미 주주 회원이신가요? 이 곳으로 오세요"}
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
