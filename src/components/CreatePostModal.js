import React, { useState } from "react";
import { BiX, BiCamera, BiUser } from "react-icons/bi";
import { connect } from "react-redux";
import { addPost, setPostData } from "../redux/action/createPost";
function CreatePostModal(props) {
  const { createPostData, auth, setPostData, addPost, setshowCreateModal } =
    props;
  const { photoURL, displayName, uid } = auth;
  const { title, imageBase64, imageObj } = createPostData;
  //
  // const [title, setTitle] = useState(createPostData.title);
  // const [imageBase64, setImage] = useState(createPostData.imageBase64);

  const handleImage = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setPostData({ imageBase64: reader.result, imageObj: file });
    };
    reader.readAsDataURL(file);
  };
  //
  const addPostHandler = () => {
    if (title || imageBase64) {
      addPost({
        displayName,
        photoURL,
        uid,
        imageBase64,
        imageObj,
        title,
      });
      setshowCreateModal();
    }
  };
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
          value={title}
          onChange={(e) => setPostData({ title: e.target.value })}
        />
      </div>
      <div className="create-post-modal-add-photo">
        <label htmlFor="file" className="create-post-modal-CTA  ">
          {imageBase64 ? "Change " : "Upload "} Photo
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleImage}
          id="file"
          required
        />
        {imageBase64 ? (
          <div>
            <span
              onClick={() => setPostData({ imageBase64: "", imageObj: {} })}
            >
              <BiX className="navbar__icons " />
            </span>
            <img src={imageBase64} />
          </div>
        ) : null}
      </div>
      <div className="create-post-modal-add-post-button-wrapper ">
        <button
          onClick={addPostHandler}
          disabled={!title && !imageBase64}
          className="create-post-modal-CTA create-post-modal-add-post-button "
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  createPostData: state.createPost,
});
const mapDispatchToProps = (dispatch) => ({
  setPostData: (data) => dispatch(setPostData(data)),
  addPost: (data) => dispatch(addPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostModal);
