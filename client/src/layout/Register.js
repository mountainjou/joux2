import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
// import Alert from "../Alert";

const Register = () => {
  return <div>회원가입</div>;
};

export default Register;
// const Register = ({ setAlert, register, isAuthenticated }) => {
//   const [values, setValues] = React.useState({
//     name: "",
//     email: "",
//     call_num: "",
//     password: "",
//     password2: "",
//     role: ""
//   });

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const { name, email, call_num, password, password2, role } = values;

//   const onSubmit = async e => {
//     e.preventDefault();
//     if (password !== password2) {
//       setAlert("Password do not match", "negative");
//     } else {
//       register({ name, email, call_num, password, role });
//     }
//   };

//   if (isAuthenticated) {
//     return <Redirect to="/" />;
//   }

//   return <div>회원가입</div>;
// };

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(
//   mapStateToProps,
//   { setAlert, register }
// )(Register);
