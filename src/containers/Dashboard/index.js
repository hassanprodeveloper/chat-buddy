import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./styles.css";
//
import { connect } from "react-redux";
//
import Create from "../../components/Create";
import FullScreenModal from "../../components/FullScreenModal";
//
import { logOut } from "../../redux/action/auth";

function Dashboard(props) {
  const { auth, logOut } = props;
  const [showCreateModal, setshowCreateModal] = useState(false);
  console.log("dashboard auth data", auth);
  const { displayName, photoURL } = auth;
  return (
    <div>
      <Navbar logOut={logOut} />
      <div className="dashboard_main_cont">
        <div className="dashboard_sidebar dashboard_left_sidebar "></div>
        <div className="dashboard_centered_cont">
          <div className="dashboard_centered_main_cont">
            <Create
              displayName={displayName}
              photoURL={photoURL}
              onCraete={() => setshowCreateModal(true)}
            />
          </div>
        </div>
        <div className="dashboard_sidebar dashboard_right_sidebar"></div>
      </div>
      <FullScreenModal setshow={setshowCreateModal} show={showCreateModal}>
        <h1>create post</h1>
      </FullScreenModal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: (data) => dispatch(logOut(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);