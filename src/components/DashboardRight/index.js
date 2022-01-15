import React, { useState } from "react";
import { connect } from "react-redux";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";
import Friends from "./Friends";
import "./style.css";
//
const DashboardRight = ({ currentUser }) => {
  const { receivedFriendRequests } = currentUser;
  const [showTab1, setshowTab1] = useState(true);
  return (
    <>
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
      {/*  */}

      {receivedFriendRequests ? (
        receivedFriendRequests.length > 0 ? (
          <div className="create dashboard_right_wrapper">
            <div className="dashboard_right_tab_header">
              <button
                className="dashboard_right_tab "
                style={{ background: `var(--background-light)` }}
              >
                Friends Requests
              </button>
            </div>
            <div className="dashboard_right_tab_body">
              <FriendRequests receivedFriendRequests={receivedFriendRequests} />
            </div>
          </div>
        ) : null
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.global.currentUser,
});
const mapDispatchToProps = (dispatch) => ({});
//
export default connect(mapStateToProps, mapDispatchToProps)(DashboardRight);
