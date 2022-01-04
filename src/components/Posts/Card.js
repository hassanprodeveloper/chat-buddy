import React from "react";
import { BiUser } from "react-icons/bi";
import Reaction from "./Reaction";

function Card(props) {
  const { post, key } = props;
  const { user_name, user_image, createdAt, post_image, title, user_uid, id } =
    post;
  function timeSince(sec = 0) {
    let date = new Date(sec * 1000);
    var seconds = Math.ceil((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.ceil(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.ceil(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.ceil(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.ceil(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.ceil(interval) + " minutes ago";
    }
    return Math.ceil(seconds) + " seconds ago";
  }
  return (
    <div className="posts" key={id}>
      <div className="post__header">
        <div className=" post__header_userinfo_wrapper cursorPointer">
          <span className="post__header_user_image">
            {user_image ? (
              <img src={user_image} alt="user" />
            ) : (
              <BiUser className="navbar__icons" />
            )}
          </span>
          <div>
            <div className="post__header_user_name">{user_name}</div>
            <div className="post__header_time">
              {timeSince(createdAt.seconds)}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="posts__img">
        <div className=" post__header_userinfo_wrapper ">
          <span className="posts__header-name">{title}</span>
        </div>
        <div className="post__image_wrapper">
          <img src={post_image} alt="" />
        </div>
      </div>
      <Reaction />
    </div>
  );
}

export default Card;
