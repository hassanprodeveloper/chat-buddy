import React, { useState } from "react";
import FindFriends from "./FindFriend";
import Friends from "./Friends";
import "./style.css";
export default () => {
  const [showTab1, setshowTab1] = useState(true);
  return (
    <div className="create dashboard_right_wrapper">
      <div className="dashboard_right_tab_header">
        <button
          onClick={() => setshowTab1(true)}
          className="dashboard_right_tab "
          style={{ background: showTab1 ? `var(--background-light)` : "" }}
        >
          Friends
        </button>
        <button
          onClick={() => setshowTab1(false)}
          className="dashboard_right_tab"
          style={{ background: !showTab1 ? `var(--background-light)` : "" }}
        >
          Find Friends
        </button>
      </div>
      <div className="dashboard_right_tab_body">
        {showTab1 ? <Friends /> : <FindFriends />}
      </div>
    </div>
  );
};
