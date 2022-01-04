/* 
use:
    • pass an array in props name as routesArr = [{children: _a component to render in router_ , path: _route path_ , type: private || public || auth }] 

*/

import React, { useContext, createContext, useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
// import { connect } from "react-redux";
import { get } from "../services/localStorage";
import { LOGIN_SUCCESS, LOG_OUT } from "../constants";
// Default constants

export const DEFAULT_ROUTE = "/dashboard";
export const DEFAULT_AUTH_ROUTE = "/login";

export const localStorage_auth = () => {
  const localStorage_auth_data = get({ key: "auth" });
  return localStorage_auth_data
    ? localStorage_auth_data.uid
      ? localStorage_auth_data
      : {}
    : {};
};
export let USER = localStorage_auth().uid;
// auth route component
// default router function
function Index({ children, auth, login, logOut }) {
  useEffect(() => {
    const auth_data = localStorage_auth();
    if (!auth.uid && auth_data.uid) {
      login(auth_data);
    } else if (auth.uid && !auth_data.uid) {
      logOut();
    }
  }, []);
  return <div>{children}</div>;
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  login: (data) =>
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...data },
    }),
  logOut: (data) =>
    dispatch({
      type: LOG_OUT,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
//
export const AuthRoute = (props) => {
  const { children, redirect, path, type, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !USER ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect ? redirect : DEFAULT_ROUTE,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// private route component

export const PrivateRoute = (props) => {
  const { children, redirect, path, type } = props;

  return (
    <Route
      path={path}
      //   {...rest}
      render={({ location }) =>
        USER ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect ? redirect : DEFAULT_AUTH_ROUTE,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
// public route component

export const PublicRoute = (props) => {
  const { children, redirect, path, type, bool } = props;
  let redirectCondition = bool || false;
  return (
    <Route
      path={path}
      //   {...rest}
      render={({ location }) =>
        !redirectCondition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect ? redirect : DEFAULT_ROUTE,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
