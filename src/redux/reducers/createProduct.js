import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
} from "../../constants/index";

const INITIAL_STATE = {
  creating: false,
  title: "",
  image: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        creating: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        creating: false,
        title: "",
        image: "",
      };
    case CREATE_PRODUCT_FAIL:
      return {
        creating: false,
      };
  }
  return state;
};
