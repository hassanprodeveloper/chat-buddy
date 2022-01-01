import {
  CREATE_POST_SET_DATA,
  CREATE_POST_RESETSET_DATA,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from "../../constants/index";
import { auth, db, storage } from "../../config";
import firebase from "firebase";

// set post data
export const setPostData = (data) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_POST_SET_DATA, payload: data });
  };
};
// reset create post state
export const resetPostData = (data) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_POST_RESETSET_DATA, payload: data });
  };
};
//  create post
export const addPost = (data) => {
  return async (dispatch) => {
    const { displayName, photoURL, uid, title, imageBase64, imageObj } = data;
    let base64 = imageBase64;
    let imageID = Math.random().toString(36).slice(2);
    try {
      dispatch({ type: CREATE_POST_REQUEST });
      const upload = storage
        .ref(`images`)
        .child(imageID)
        .putString(base64.split(",")[1], "base64", {
          contentType: imageObj.type,
        });
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
            .ref("images")
            .child(imageID)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").doc(imageID).set({
                user_name: displayName,
                user_uid: uid,
                user_image: photoURL,
                post_image: url,
                title,
                currentTime: firebase.firestore.FieldValue.serverTimestamp(),
              });

              await db
                .collection("users")
                .doc(uid)
                .update({
                  posts: firebase.firestore.FieldValue.arrayUnion(imageID),
                });
              console.log("created post 😄");
              dispatch({ type: CREATE_POST_SUCCESS });
            });
        }
      );
    } catch (error) {
      console.log("CREATE_POST_FAIL catch error", error);
      dispatch({ type: CREATE_POST_FAIL, payload: error });
    }
  };
};
