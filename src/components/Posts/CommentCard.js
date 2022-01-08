import React from "react";
import "./style.css";
import { BiUser } from "react-icons/bi";
import UserIcon from "./UserIcon";

//
export default ({ timeSince, item }) => {
  console.log(
    "commentcard comment Object.keys(item).length > 0",
    Object.keys(item).length > 0
  );
  const { displayName, comment, photoURL, createdAt } = item;
  if (Object.keys(item).length < 1) return null;
  return (
    <div className="flex-row commentCard_main_cont">
      <UserIcon src={photoURL} className="m-_5" />
      <span>
        <div className="commentCard_body">
          <div className="post__header_user_name">{displayName}</div>
          <div className="m-_5">{comment}</div>
        </div>
        {createdAt ? (
          <div className="post__header_time align-horizontal-end">
            <span className="m-_51 mh-1"> {timeSince(createdAt.seconds)}</span>
          </div>
        ) : null}
      </span>
    </div>
  );
};
