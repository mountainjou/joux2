import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
// import Alert from "../Alert";

// const Login = ({ login, isAuthenticated }) => {
const Login = () => {
  //   const [values, setValues] = React.useState({
  //     email: "",
  //     password: ""
  //   });

  //   const handleChange = name => event => {
  //     setValues({ ...values, [name]: event.target.value });
  //   };

  //   const { email, password } = values;

  //   const onSubmit = async e => {
  //     e.preventDefault();
  //     // recaptchaRef.current.execute();
  //     login(email, password);
  //   };

  //   // Redirect if logged in
  //   if (isAuthenticated) {
  //     return <Redirect to="/" />;
  //   }

  return <div>로그인</div>;
};

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(
//   mapStateToProps,
//   { login }
// )(Login);

export default Login;
