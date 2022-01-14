import React from "react";
import { appName, logoText } from "../app.info";
import { BiMessageDetail, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
function Navbar(props) {
  const { logOut } = props;
  return (
    <div className="navbar">
      <span className="navbar_title">{appName}</span>
      <span className="navbar_icon_wrapper">
        <Link to="/messager">
          <BiMessageDetail className="navbar__icons" />
        </Link>
        <Link to="/profile">
          <BiUser className="navbar__icons" />
        </Link>
      </span>
    </div>
  );
}

export default Navbar;
