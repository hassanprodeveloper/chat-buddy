import React from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { db } from "../../config";
function Reaction() {
  return (
    <div className="post_reaction_main_wrapper">
      <span className="post_reaction_button cursorPointer">
        <FaRegHeart className="post_reaction_button_icon cursorPointer" />
        Like
      </span>
      <span className="post_reaction_button cursorPointer">
        <FaRegComment className="post_reaction_button_icon cursorPointer" />
        Comments
      </span>
    </div>
  );
}

export default Reaction;
