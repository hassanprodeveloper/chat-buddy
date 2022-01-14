import { db } from "../../config";
import { ALL_USERS, CURRENT_USERS } from "../../constants";

//// reset create post state
export const getAllUsers = (uid) => {
  return async (dispatch) => {
    console.log("c", uid);
    db.collection("users")
      //   .orderBy("createdAt", "desc")
      .onSnapshot((snp) => {
        let users = {};
        snp.docs.map((doc) => {
          return doc.id == uid
            ? null
            : (users[doc.id] = {
                createdAt: doc.data().createdAt || {},
                displayName: doc.data().displayName || "",
                photoURL: doc.data().photoURL || "",
                uid: doc.data().uid || "",
                email: doc.data().email || "",
                friends: doc.data().friends || [],
                likedPosts: doc.data().likedPosts || [],
              });
        });
        console.log("get all users function data", users);
        dispatch({
          type: ALL_USERS,
          payload: users,
        });
      });
  };
};
//
//// set current user data
export const setCurrentUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: CURRENT_USERS, payload: data });
  };
};
