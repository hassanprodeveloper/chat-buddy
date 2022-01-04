import React from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
function Reaction() {
  return (
    <div className="post_reaction_main_wrapper">
      <span className="post_reaction_button cursorPointer">
        <span>
          <FaRegHeart className="post_reaction_button_icon cursorPointer" />
          Like
        </span>
      </span>
      <span className="post_reaction_button cursorPointer">
        <FaRegComment className="post_reaction_button_icon cursorPointer" />
        Comments
      </span>
    </div>
  );
}

export default Reaction;
