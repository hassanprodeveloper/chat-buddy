import React, { useEffect, useState } from "react";
import UserIcon from "../../Posts/UserIcon";
import { timeSince } from "../../../services/calculateTime";
import { BiUserPlus, BiCheck } from "react-icons/bi";
import { db, firebase } from "../../../config";
import { connect } from "react-redux";
//
function UserCard(props) {
  const { user, auth, sentFriendRequests } = props;
  const { createdAt, displayName, uid, photoURL, email, friends } = user;
  const [requestSent, setrequestSent] = useState(false);
  //
  const sendRequest = async () => {
    // send request
    await db
      .collection("users")
      .doc(uid)
      .update({
        receivedFriendRequests: firebase.firestore.FieldValue.arrayUnion(
          auth.uid
        ),
      });
    // save request to see later
    await db
      .collection("users")
      .doc(auth.uid)
      .update({
        sentFriendRequests: firebase.firestore.FieldValue.arrayUnion(uid),
      });
  };
  //
  const cancelRequest = async () => {
    // send request
    await db
      .collection("users")
      .doc(uid)
      .update({
        receivedFriendRequests: firebase.firestore.FieldValue.arrayRemove(
          auth.uid
        ),
      });
    // save request to see later
    await db
      .collection("users")
      .doc(auth.uid)
      .update({
        sentFriendRequests: firebase.firestore.FieldValue.arrayRemove(uid),
      });
  };
  //
  console.log(
    "sentFriendRequestssentFriendRequestssentFriendRequests",
    sentFriendRequests
  );
  useEffect(() => {
    if (sentFriendRequests) {
      if (sentFriendRequests.length > 0) {
        setrequestSent(sentFriendRequests.includes(uid));
      }
    }
  }, [sentFriendRequests]);
  return (
    <div className="post__header">
      <div className=" post__header_userinfo_wrapper cursorPointer align-vertical-center">
        <UserIcon src={photoURL} className="find_friends_user_card_photo" />
        <div className="find_friends_user_card_info">
          <div className="post__header_user_name">{displayName}</div>
          <div className="post__header_time">{friends.length} Friends</div>
        </div>
        <button
          onClick={!requestSent ? sendRequest : cancelRequest}
          className="add_friend_button flex-center"
        >
          {!requestSent ? (
            <BiUserPlus
              class
              Name="add_friend_button_icon"
              // color="#ffffff"
              size={20}
            />
          ) : (
            <BiCheck
              class
              Name="add_friend_button_icon"
              // color="#ffffff"
              size={20}
            />
          )}
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  sentFriendRequests: state.global.currentUser.sentFriendRequests,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
