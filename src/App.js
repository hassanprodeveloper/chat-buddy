import React, { useEffect } from "react";
//
import { connect } from "react-redux";
//
import "./App.css";
import * as Pages from "./containers";
import "antd/dist/antd.css";
import {
  // BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
//
import RouteWrapper, {
  AuthRoute,
  PrivateRoute,
  PublicRoute,
} from "./router/index";
import { logOut } from "./redux/action/auth";
import { setCurrentUser, getAllUsers } from "./redux/action/global";
import { get } from "./services/localStorage";
import { db } from "./config";
//
function App(props) {
  const { logOut, auth, setCurrentUser, getAllUsers } = props;

  useEffect(() => {
    if (auth.uid) {
      db.collection("users")
        .doc(auth.uid)
        .onSnapshot((snap) => setCurrentUser(snap.data()));
      // fetch all users real time from firebase
      getAllUsers(auth.uid);
    }
  }, [auth]);

  return (
    <RouteWrapper>
      <Switch>
        <AuthRoute path="/login" redirect="">
          <Pages.Login />
        </AuthRoute>
        <AuthRoute path="/signup" redirect="/dashboard">
          <Pages.Signup />
        </AuthRoute>
        <PrivateRoute path="/dashboard" redirect="/login">
          <Pages.Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/profile" redirect="/login">
          <Pages.Profile />
        </PrivateRoute>
        <PrivateRoute path="/messager" redirect="/login">
          <Pages.Messenger />
        </PrivateRoute>
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </RouteWrapper>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: (data) => dispatch(logOut(data)),
  setCurrentUser: (data) => dispatch(setCurrentUser(data)),
  getAllUsers: (uid) => dispatch(getAllUsers(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
