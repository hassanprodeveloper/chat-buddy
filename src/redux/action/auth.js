import {
  LOGIN_FAIL,
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOG_OUT,
} from "../../constants/index";
import { auth, db, storage, firebase } from "../../config";
import { set, get, remove } from "../../services/localStorage";

// login
export const loginHandler = (data) => {
  return async (dispatch) => {
    try {
      const { email, password } = data;
      dispatch({ type: AUTH_REQUEST });
      const res = await auth.signInWithEmailAndPassword(email, password);
      console.log("auth action login user data", res);
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
      window.location.reload();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error });
    }
  };
};
// logout
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
      console.log("auth action register user data", res);
      let uid = res.user.uid;
      const upload = storage
        .ref(`users`)
        .child(uid)
        .putString(base64.split(",")[1], "base64", { contentType: obj.type });
      upload.on(
        "state_changed",
        (snp) => {
          let progress = (snp.bytesTransferred / snp.totalBytes) * 100;
        },
        (err) => {
          console.log("register catch", err);
        },
        () => {
          //success function/complete function
          const firebaseTimestemp =
            firebase.firestore.FieldValue.serverTimestamp();
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
                  createdAt: firebaseTimestemp,
                  email: res.user.email,
                  emailVerified: res.user.emailVerified,
                  phoneNumber: res.user.phoneNumber,
                  uid: res.user.uid,
                },
              });
              await db.collection("users").doc(uid).set({
                displayName: name,
                photoURL: url,
                createdAt: firebaseTimestemp,
                email: res.user.email,
                emailVerified: res.user.emailVerified,
                phoneNumber: res.user.phoneNumber,
                uid: res.user.uid,
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
