import React from "react";
import UserIcon from "../../Posts/UserIcon";
import { BiUserPlus } from "react-icons/bi";
import { db, firebase } from "../../../config";
import { connect } from "react-redux";
//
function UserCard(props) {
  const { user, auth } = props;
  const { displayName, uid, photoURL, friends } = user;
  //
  const acceptRequest = async () => {
    await db
      .collection("users")
      .doc(auth.uid)
      .update({
        receivedFriendRequests: firebase.firestore.FieldValue.arrayRemove(uid),
      });
    await db
      .collection("users")
      .doc(auth.uid)
      .update({
        friends: firebase.firestore.FieldValue.arrayUnion(uid),
      });
    await db
      .collection("users")
      .doc(uid)
      .update({
        sentFriendRequests: firebase.firestore.FieldValue.arrayRemove(auth.uid),
      });
    await db
      .collection("users")
      .doc(uid)
      .update({
        friends: firebase.firestore.FieldValue.arrayUnion(auth.uid),
      });
  };
  return (
    <div className="post__header">
      <div className=" post__header_userinfo_wrapper cursorPointer align-vertical-center">
        <UserIcon src={photoURL} className="find_friends_user_card_photo" />
        <div className="find_friends_user_card_info">
          <div className="post__header_user_name">{displayName}</div>
          <div className="post__header_time">{friends.length} Friends</div>
        </div>
        <button
          onClick={acceptRequest}
          className="add_friend_button flex-center"
        >
          <BiUserPlus
            class
            Name="add_friend_button_icon"
            // color="#ffffff"
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
