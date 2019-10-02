import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import Alert from "../Alert";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = ({ login, isAuthenticated }) => {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password } = values;

  // 로그인 버튼 푸쉬 이벤트시 실행.
  const onSubmit = async e => {
    e.preventDefault();
    // recaptchaRef.current.execute();
    // 리덕스 login 액션 실행
    login(email, password);
  };

  // Redirect if logged in
  // 로그인이 되어있다면 메인페이지로 리다이렉트
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    // Form 에서 submit 이벤트 발생시 onSubmit 함수 실행
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
      <Button type="submit" color="primary">
        Login
      </Button>
    </Form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
