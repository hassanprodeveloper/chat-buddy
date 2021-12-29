import React from "react";
import { appName, logoText } from "../app.info";
import { BiMessageDetail, BiUser } from "react-icons/bi";
function Navbar(props) {
  const { logOut } = props;
  return (
    <div className="navbar">
      <span className="navbar_title">{appName}</span>
      <span className="navbar_icon_wrapper">
        <BiMessageDetail className="navbar__icons" />
        <BiUser onClick={logOut} className="navbar__icons" />
      </span>
    </div>
  );
}

export default Navbar;
