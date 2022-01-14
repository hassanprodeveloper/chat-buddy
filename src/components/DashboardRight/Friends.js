import React, { useEffect, useState } from "react";
import UserIcon from "../Posts/UserIcon";
import { db } from "../../config";
import { connect } from "react-redux";
//
function Friends(props) {
  const { auth } = props;
  console.log("friends list auth ", auth);

  // fetch comments in real time
  // useEffect(() => {
  //   db.collection("users")
  //     .doc(auth.uid)
  //     .get()
  //     .then((arr) => console.log("get use effect arr", arr));
  // }, []);
  return <div>Friends </div>;
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Friends);
