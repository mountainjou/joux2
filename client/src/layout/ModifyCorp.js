import React from "react";
import PropTypes from "prop-types";
// import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../Alert";
import { setAlert } from "../actions/alert";
import Axios from "axios";
import Spinner from "../components/Spinner";

const RegisterCorp = ({ setAlert, auth: { user, loading } }) => {
  const [values, setValues] = React.useState({
    email: user.email,
    password: "",
    corporation: ""
  });

  // 폼에서 입력되는 값을 상태값에 지정
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password, corporation } = values;

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
      corporation: corporation,
      password: password,
      email: email
    };

    Axios.post("/api/users/registercorporation", payload, config)
      .then(result => {
        console.log(result);
        setAlert(`기업명 ${result.data}이 등록되었습니다`, "success");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return loading === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <form onSubmit={e => onSubmit(e)}>
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
          <label htmlFor="corporation">기업명</label>
          {user.corporation !== undefined && "" ? (
            <input
              className="form-control"
              type="text"
              name="corporation"
              id="corporation"
              value={values.corporation}
              disabled
            />
          ) : (
            <input
              className="form-control"
              type="text"
              name="corporation"
              id="corporation"
              autoComplete="new-username"
              value={values.corporation}
              onChange={handleChange("corporation")}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
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
)(RegisterCorp);
