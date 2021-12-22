import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../../constants/index";

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        show: false,
      };
    case LOGIN_FAIL:
      return {
        show: false,
      };
  }
  return state;
};
