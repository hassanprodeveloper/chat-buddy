import React, { useState } from "react";
import { BiX, BiMinus } from "react-icons/bi";
function FullScreenModal(props) {
  const { setshow, show, children } = props;
  const hideModal = () => {
    setshow(false);
  };
  if (!show) return null;
  return (
    <div className="fullScreenModal_main_cont">
      <div className="fullScreenModal_header_main">
        <span className="navbar_icon_wrapper">
          <BiMinus
            onClick={() => setshow(false)}
            className="navbar__icons fullScreenModal_header_icon"
          />
          <BiX
            onClick={hideModal}
            className="navbar__icons fullScreenModal_header_icon"
          />
        </span>
      </div>
      {/* modal view */}
      <div className="fullScreenModal_body_main">
        <div className="fullScreenModal_card_main">{children}</div>
      </div>
    </div>
  );
}

export default FullScreenModal;
