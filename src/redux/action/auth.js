import {
  LOGIN_FAIL,
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOG_OUT,
} from "../../constants/index";
import { auth, db, storage } from "../../config";
import { set, get, remove } from "../../services/localStorage";

// login
export const loginHandler = (data) => {
  return async (dispatch) => {
    try {
      const { email, password } = data;
      dispatch({ type: AUTH_REQUEST });
      const res = await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: LOGIN_SUCCESS, payload: res.user });
      let userInfo = {
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
        createdAt: res.user.createdAt,
        emailVerified: res.user.emailVerified,
        lastLoginAt: res.user.lastLoginAt,
        phoneNumber: res.user.phoneNumber,
        uid: res.user.uid,
      };
      set({ key: "auth", data: userInfo });
      console.log("loginhandler res", res);
      window.location.reload();
    } catch (error) {
      console.log("loginhandler res", error);
      dispatch({ type: LOGIN_FAIL, payload: error });
    }
  };
};
export const logOut = (data) => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT, payload: {} });
    window.location.reload();
  };
};
// sign up

export const register = (data) => {
  return async (dispatch) => {
    const { name, email, password, image } = data;
    let { obj, base64 } = image;
    try {
      dispatch({ type: AUTH_REQUEST });
      const res = await auth.createUserWithEmailAndPassword(email, password);
      let uid = res.user.uid;
      const upload = storage
        .ref(`users`)
        .child(uid)
        .putString(base64.split(",")[1], "base64", { contentType: obj.type });
      upload.on(
        "state_changed",
        (snp) => {
          let progress = (snp.bytesTransferred / snp.totalBytes) * 100;
          console.log("on create post progress", progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          //success function/complete function
          storage
            .ref("users")
            .child(uid)
            .getDownloadURL()
            .then(async (url) => {
              let userInfo = {
                displayName: name,
                photoURL: url,
              };
              dispatch({
                type: LOGIN_SUCCESS,
                payload: { ...res.user, ...userInfo },
              });
              res.user.updateProfile(userInfo);
              set({
                key: "auth",
                data: {
                  displayName: name,
                  photoURL: url,
                  createdAt: res.user.createdAt,
                  email: res.user.email,
                  emailVerified: res.user.emailVerified,
                  phoneNumber: res.user.phoneNumber,
                  uid: res.user.uid,
                },
              });
              await db
                .collection("users")
                .doc(uid)
                .set({
                  userInfo: {
                    displayName: name,
                    photoURL: url,
                  },
                });
              window.location.reload();
            });
        }
      );
    } catch (error) {
      console.log("register catch error", error);
      dispatch({ type: LOGIN_FAIL, payload: error });
    }
  };
};
//
