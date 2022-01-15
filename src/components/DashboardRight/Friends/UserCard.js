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
  if (user)
    return (
      <div className="post__header">
        <div className=" post__header_userinfo_wrapper cursorPointer align-vertical-center">
          <UserIcon src={photoURL} className="find_friends_user_card_photo" />
          <div className="find_friends_user_card_info">
            <div className="post__header_user_name">{displayName}</div>
            <div className="post__header_time">{friends.length} Friends</div>
          </div>
          {/* <button
          onClick={acceptRequest}
          className="add_friend_button flex-center"
        >
          <BiUserPlus
            class
            Name="add_friend_button_icon"
            // color="#ffffff"
            size={20}
          />
        </button> */}
        </div>
      </div>
    );
  return <></>;
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
