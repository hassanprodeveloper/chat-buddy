import React, { useState } from "react";
import { FaVideo, FaRegFileImage, FaRegGrinAlt } from "react-icons/fa";
import { BiCamera, BiUser } from "react-icons/bi";
import { connect } from "react-redux";

const Create = (props) => {
  const { createProduct, onCraete, photoURL, displayName } = props;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const createPost = () => {
    // create({ title, image });
    setTitle("");
    setImage("");
  };
  return (
    <div className="create">
      <div className="create__first-img cursorPointer">
        <span>
          {photoURL ? (
            <img src={photoURL} alt="user" />
          ) : (
            <BiUser className="navbar__icons" />
          )}
        </span>
      </div>
      <div className="create__first-input cursorPointer">
        {/* <input
          disabled
          type="text"
          className="create__first-inputs cursorPointers"
          placeholder="Shakil what are your mind? "
        /> */}
        <p onClick={onCraete} className="create__first-inputs cursorPointers">
          {displayName} what's on your mind?
        </p>
      </div>
      <span className="create__second-icon cursorPointer">
        <label htmlFor="file" onClick={onCraete} className="cursorPointer">
          <BiCamera className="create__second-camera-icon" size={30} />
        </label>
        {/* <input
          type="file"
          style={{ display: "none" }}
          onChange={handleImage}
          id="file"
          required
        /> */}
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  createProduct: state.createProduct,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
