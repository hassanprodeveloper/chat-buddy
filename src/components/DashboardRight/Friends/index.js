import React, { useEffect, useState } from "react";
import UserIcon from "../../Posts/UserIcon";
import { db } from "../../../config";
import { connect } from "react-redux";
import UserCard from "./UserCard";
//
function Friends(props) {
  const { currentUser, allUsers } = props;
  const { friends } = currentUser;
  console.log("friends friends data", friends);
  return friends ? (
    friends.length > 0 ? (
      friends.map((user, index) => {
        return allUsers[user] ? (
          <UserCard key={index} user={allUsers[user]} />
        ) : null;
      })
    ) : (
      <div>Start Adding Friends.</div>
    )
  ) : null;
}
const mapStateToProps = (state) => ({
  currentUser: state.global.currentUser,
  allUsers: state.global.allUsers,
});
export default connect(mapStateToProps, null)(Friends);
