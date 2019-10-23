import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_USEREMAIL
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// registerCorporation
export const registerCorporation = ({
  password,
  email,
  corperation
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password, corperation });

  try {
    const res = await axios.put(
      "/api/auth/updatePasswordViaEmail",
      body,
      config
    );
    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
