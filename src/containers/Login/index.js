import React, { useState } from "react";
import "./styles.css";
import "../../App.css";
import { connect } from "react-redux";
import { loginHandler } from "../../redux/action/auth";
import { Link } from "react-router-dom";
//
function Login(props) {
  const { loginHandler, auth, loading } = props;
  const [validateMessage, setvalidateMessage] = useState("");
  const validateMessageHandler = () => {
    let message = "Enter all fields.";
    setvalidateMessage(message);
    setTimeout(() => {
      setvalidateMessage("");
    }, 4000);
  };
  const onSubmitHandler = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email && password) {
      loginHandler({ email, password });
    } else {
      validateMessageHandler();
      console.log("onsubmit email and password empty", email, password);
    }
  };
  console.log("login auth data", auth);
  return (
    <div className="login-form">
      <div className="radius5 form-container">
        <h2 className="text-center">Log in</h2>
        <div className="form-group">
          <input
            disabled={loading}
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Email *"
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            disabled={loading}
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Password *"
            required="required"
          />
        </div>
        <div className="form-group">
          <span className="validateText">{validateMessage}</span>
        </div>

        <div className="form-group">
          <button
            disabled={loading}
            onClick={() => onSubmitHandler()}
            className="btn btn-primary btn-block"
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </div>
        <div className="clearfix">
          {/* <label className="pull-left checkbox-inline">
            <input type="checkbox" /> Remember me
          </label> */}
          <Link
            disabled={loading}
            to={loading ? "" : "/signup"}
            className="pull-right"
          >
            Create an Account
            {/* Forgot Password? */}
          </Link>
        </div>
      </div>
      {/* <p className="text-center">
        <a disabled={loading} href="#">
          Create an Account
        </a>
      </p> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});
const mapDispatchToProps = (dispatch) => ({
  loginHandler: (data) => dispatch(loginHandler(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
