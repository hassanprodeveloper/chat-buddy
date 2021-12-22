import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../../constants/index";
import { auth, db, storage } from "../../config";

const loginHandler = (data) => {
  return async (dispatch) => {
    const { email, password } = data;
    dispatch({ type: LOGIN_REQUEST });
    const res = await auth.signInWithEmailAndPassword(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: res });
    localStorage.setItem("chatBuddy_user", JSON.stringify(res));
  };
};

export { loginHandler };
