import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_SET_DATA,
  CREATE_POST_RESETSET_DATA,
} from "../../constants/index";

const INITIAL_STATE = {
  creating: false,
  title: "",
  imageBase64: "",
  imageObj: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        creating: true,
      };
    case CREATE_POST_SUCCESS:
      return INITIAL_STATE;
    case CREATE_POST_FAIL:
      return {
        ...state,
        creating: false,
      };
    case CREATE_POST_SET_DATA:
      console.log(
        "CREATE_POST_SET_DATA reducer action.payload",
        action.payload
      );
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_POST_RESETSET_DATA:
      return INITIAL_STATE;
  }
  return state;
};
