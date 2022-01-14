import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import global from "./global";
//
export default combineReducers({
  auth,
  post,
  global,
});
