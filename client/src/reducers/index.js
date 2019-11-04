import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import bulletin from "./bulletin";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  bulletin
});
