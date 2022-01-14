import { ALL_USERS, CURRENT_USERS } from "../../constants/index";

const INITIAL_STATE = {
  allUsers: {},
  currentUser: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case CURRENT_USERS:
      return {
        ...state,
        currentUser: action.payload,
      };
  }
  return state;
};
