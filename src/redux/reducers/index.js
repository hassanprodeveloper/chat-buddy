import { combineReducers } from "redux";
import auth from "./auth";
import createPost from "./createPost";
export default combineReducers({
  auth,
  createPost,
});
