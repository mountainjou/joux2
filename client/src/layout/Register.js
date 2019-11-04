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
    <div className="container">
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            autoComplete="username"
            id="email"
            value={values.email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="password2"
            id="password2"
            autoComplete="new-password"
            value={values.password2}
            onChange={handleChange("password2")}
          />
        </div>
        <div className="form-group">
          <label for="username">사용하실 닉네임을 입력해주세요</label>
          <input
            className="form-control"
            type="name"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange("username")} 
          />
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
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <br />
        <br />
        <Link to="/login" variant="body2">
          {"Already have an account? Sign In"}
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
