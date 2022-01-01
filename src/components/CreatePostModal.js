import React from "react";
import { BiX, BiCamera, BiUser } from "react-icons/bi";

function CreatePostModal(props) {
  const { auth } = props;
  const { photoURL, displayName } = auth;
  return (
    <div className="create-post-modal-main">
      {/* header */}
      <div className="create-post-modal-header">
        <span className="create-post-modal-header-title">Create Posts</span>
      </div>
      {/* user info */}
      <div className="align-center">
        <span className="create-post-modal-avatar m-1">
          {photoURL ? (
            <img src={photoURL} alt="user" />
          ) : (
            <BiUser className="navbar__icons" />
          )}
        </span>
        <span
          className="create-post-modal-header-title"
          // style={{ fontWeight: 600, fontSize: "1.6rem" }}
        >
          {displayName}
        </span>
      </div>
      {/* what's on your mind input */}
      <div className="create-post-modal-input-wrapper flex-center">
        <textarea
          rows={5}
          col={4}
          type="text"
          placeholder="What's on your mind?"
        />
      </div>
      <div className="create-post-modal-add-photo">
        <button className="create-post-modal-CTA">Upload Photo</button>
        <div>
          <span>
            <BiX className="navbar__icons " />
          </span>
          <img src={photoURL} />
        </div>
      </div>
      <div className="create-post-modal-add-post-button-wrapper ">
        <button className="create-post-modal-CTA create-post-modal-add-post-button ">
          Add Post
        </button>
      </div>
    </div>
  );
}

export default CreatePostModal;
