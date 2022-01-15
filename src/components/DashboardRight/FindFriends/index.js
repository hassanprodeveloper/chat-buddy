import React, { useEffect, useState } from "react";
import UserIcon from "../../Posts/UserIcon";
import { connect } from "react-redux";
import { getAllUsers } from "../../../redux/action/global";
import UserCard from "./UserCard";
//
function FindFriends(props) {
  const { auth, getAllUsers, allUsers, currentUser } = props;
  const { friends } = currentUser;
  const [notFriends, setnotFriends] = useState([]);
  console.log("FindFriends list auth ", auth);
  console.log("FindFriends list allusera ", allUsers);

  // fetch all users real time from firebase
  useEffect(() => {
    if (auth.uid) getAllUsers(auth.uid);
  }, []);
  //
  useEffect(() => {
    if (allUsers) {
      let userList = Object.values(allUsers);
      if (userList.length > 0) {
        setnotFriends(userList.filter((e) => !friends.includes(e.uid)));
      }
    }
  }, [allUsers]);
  //
  const addFriendList = () =>
    notFriends.map((user, index) => <UserCard key={index} user={user} />);
  //
  return notFriends.length > 0 ? (
    addFriendList()
  ) : (
    <div>No Friend to show.</div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  allUsers: state.global.allUsers,
  currentUser: state.global.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (uid) => dispatch(getAllUsers(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
