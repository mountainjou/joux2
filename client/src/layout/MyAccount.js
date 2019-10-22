import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MyAccount = ({ auth: { user } }) => {
  return (
    <div>
      <div>내 정보</div>
      <div>email : {user.email}</div>
      <div>corporation : {user.corporation}</div>
    </div>
  );
};

MyAccount.propTypes = {
  auth: PropTypes.object.isRequired
};

// 상태값 변수에 대입
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MyAccount);
