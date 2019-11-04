import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Alert from "../Alert";
import { setAlert } from "../actions/alert";
import Spinner from "../components/Spinner";

const ReceiveToken = ({ setAlert, auth: { user, loading } }) => {
  return loading === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <div>수령하기</div>
    </div>
  );
};

ReceiveToken.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(ReceiveToken);
