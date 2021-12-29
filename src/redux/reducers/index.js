import { combineReducers } from "redux";
import auth from "./auth";
import createProduct from "./createProduct";
export default combineReducers({
  auth,
  createProduct,
});
