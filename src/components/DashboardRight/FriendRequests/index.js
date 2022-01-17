import React, { useEffect, useState } from "react";
import UserIcon from "../../Posts/UserIcon";
import { connect } from "react-redux";
import UserCard from "./UserCard";
//
function FriendRequests(props) {
  const { auth, getAllUsers, allUsers, receivedFriendRequests } = props;
  console.log("FindFriends list auth ", auth);
  console.log("FindFriends list allusera ", allUsers);

  //
  const addFriendList = () =>
    receivedFriendRequests.map((user, index) => (
      <UserCard key={index} user={allUsers[user]} />
    ));
  //
  return receivedFriendRequests.length > 0 ? (
    addFriendList()
  ) : (
    <div>No Friend to show.</div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  allUsers: state.global.allUsers,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
