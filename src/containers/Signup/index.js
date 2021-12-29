import React, { useMemo, useState } from "react";
import "./styles.css";
import "../../App.css";
import { connect } from "react-redux";
import { register } from "../../redux/action/auth";
import { Link } from "react-router-dom";
import { BiCamera } from "react-icons/bi";

//
function Signup(props) {
  const { register, auth, loading } = props;
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [p1, setp1] = useState("");
  const [p2, setp2] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState({ base64: "", obj: {} });
  //
  const [validateMessage, setvalidateMessage] = useState("");
  const validateMessageHandler = () => {
    let message = "Enter all fields.";
    setvalidateMessage(message);
    setTimeout(() => {
      setvalidateMessage("");
    }, 4000);
  };
  //
  const setimageHandler = (e) => {
    var file = e.target.files[0];
    console.log("setimagehandler", file);

    var reader = new FileReader();
    reader.onloadend = function () {
      setimage({ ...image, base64: reader.result, obj: file });
    };
    reader.readAsDataURL(file);
  };
  //
  const onSubmitHandler = () => {
    if (name && email && password && image) {
      register({ name, email, password, image });
    } else {
      validateMessageHandler();
    }
  };
  useMemo(() => {
    if (p1 === p2 && p1.length !== 0) {
      setpassword(p1);
    } else {
      setpassword("");
    }
  }, [p1, p2]);
  console.log("register => name, email, password, image ", {
    name,
    email,
    password,
    image,
  });
  return (
    <div className="login-form">
      <div className="radius5 form-container">
        <h2 className="text-center">Create Account</h2>
        <div className="form-group flex_center">
          <label className="signup_image_cont" htmlFor="file">
            {image.base64 ? (
              <img src={image.base64} className="signup_image" />
            ) : (
              <BiCamera className="create__second-camera-icon" size={30} />
            )}
          </label>
          {loading ? null : (
            <input
              style={{ display: "none" }}
              type="file"
              onChange={setimageHandler}
              id="file"
              required
            />
          )}
        </div>
        <div className="form-group">
          <input
            disabled={loading}
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Name *"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            disabled={loading}
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Email *"
            required="required"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
            value={p1}
            onChange={(e) => setp1(e.target.value)}
          />
          {p1.length < 8 && p1.length !== 0 ? (
            <div className="validateText">
              Password must be minimum 8 character long.
            </div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            disabled={loading}
            id="confrim_password"
            name="confrim_password"
            type="password"
            className="form-control"
            placeholder="Confrim Password *"
            required="required"
            value={p2}
            onChange={(e) => setp2(e.target.value)}
          />
          {p2.length < 8 && p2.length !== 0 ? (
            <div className="validateText">
              Confrim password must be minimum 8 character long.
            </div>
          ) : null}
          {!password && p1 && p2 && p1 !== p2 ? (
            <div className="validateText">
              Password and Confrim password must be same.
            </div>
          ) : null}
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
            {loading ? "Creating..." : "Sign up"}
          </button>
        </div>
        <div className="clearfix">
          {/* <label className="pull-left checkbox-inline">
            <input type="checkbox" /> Remember me
          </label> */}
          <Link
            disabled={loading}
            to={loading ? "" : "/login"}
            className="pull-right"
          >
            Already hava an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});
const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
