import React, { useEffect, useState } from "react";
import UserIcon from "../../Posts/UserIcon";
import { connect } from "react-redux";
import { getAllUsers } from "../../../redux/action/global";
import UserCard from "./UserCard";
//
function FindFriends(props) {
  const { auth, getAllUsers, allUsers } = props;
  console.log("FindFriends list auth ", auth);
  console.log("FindFriends list allusera ", allUsers);

  // fetch all users real time from firebase
  useEffect(() => {
    if (auth.uid) getAllUsers(auth.uid);
  }, []);
  //
  const addFriendList = () =>
    Object.values(allUsers).map((user, index) => (
      <UserCard key={index} user={user} />
    ));
  //
  return Object.keys(allUsers).length > 0 ? (
    addFriendList()
  ) : (
    <div>No Friend to show.</div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  allUsers: state.global.allUsers,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (uid) => dispatch(getAllUsers(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
