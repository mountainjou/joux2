import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
import AlertMsg from "../AlertMsg";

import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    password2: ""
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password, password2 } = values;

  const onSubmit = async e => {
    e.preventDefault();
    // 만약 password와 password2가 값이 다르면 setAlert 액션을 실행한다.
    if (password !== password2) {
      setAlert("Password do not match", "negative");
    } else {
      // password와 password2가 값이 같다면 register 액션을 실행한다.
      register({ email, password });
    }
  };

  // 인증이 되었으면 메인페이지로 리다이렉트
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange("email")}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange("password")}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Confirm Password</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            value={values.password2}
            onChange={handleChange("password2")}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Register
        </Button>
        <br />
        <br />
        <Link to="/login" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </Form>
      <AlertMsg />
    </Container>
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
