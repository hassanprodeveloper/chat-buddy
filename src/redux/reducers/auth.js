import {
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOG_OUT,
} from "../../constants/index";
import { set, get, remove } from "../../services/localStorage";

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      let loginUer = {
        loading: false,
        ...action.payload,
      };
      return loginUer;
    case LOGIN_FAIL:
      return {
        loading: false,
      };
    case LOG_OUT:
      remove({ key: "auth" });
      return INITIAL_STATE;
  }
  return state;
};
