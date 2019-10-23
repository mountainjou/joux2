import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../Alert";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import Axios from "axios";

const RegisterCorp = ({ auth: { user } }) => {
  const [values, setValues] = React.useState({
    email: user.email,
    password: "",
    corperation: "",
    isApprovedCorp: user.isApprovedCorporation
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password, corperation, isApprovedCorp } = values;

  const onSubmit = async e => {
    e.preventDefault();
    // 회원 정보 수정 액션 불러오기
    console.log("회원 정보 수정 액션 불러오기");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const payload = {
      corperation: corperation,
      password: password,
      email: email
    };

    Axios.put("/api/users/registercorporation", payload, config)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={e => onSubmit(e)} autoComplete="off">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={values.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="corperation">기업명</label>
          {user.corperation !== undefined ? (
            <input
              className="form-control"
              type="text"
              name="corperation"
              id="corperation"
              value={values.corperation}
              disabled
            />
          ) : (
            <input
              className="form-control"
              type="text"
              name="corperation"
              id="corperation"
              value={values.corperation}
              onChange={handleChange("corperation")}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
          <input
            className="form-control"
            type="current-password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isApproved">기업회원 인증여부</label>
          <input
            className="form-control"
            type="text"
            name="isApproved"
            id="isApproved"
            value={values.isApprovedCorp}
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <Alert />
    </div>
  );
};

RegisterCorp.propTypes = {
  auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RegisterCorp);
