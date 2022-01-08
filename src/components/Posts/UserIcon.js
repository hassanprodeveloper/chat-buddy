import React from "react";
import { BiUser } from "react-icons/bi";

function UserIcon({ src, className }) {
  return (
    <span className={`post__header_user_image ${className}`}>
      {src ? (
        <img src={src} alt="user" />
      ) : (
        <BiUser className="navbar__icons" />
      )}
    </span>
  );
}

export default UserIcon;
