import React, { useEffect } from "react";
//
import { connect } from "react-redux";
//
import "./App.css";
import * as Pages from "./containers";
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
import { get } from "./services/localStorage";
//
function App(props) {
  const { logOut, auth } = props;

  console.log("App auth data", auth);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
