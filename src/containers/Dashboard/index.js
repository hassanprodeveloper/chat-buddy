import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./styles.css";
//
import { connect } from "react-redux";
//
import Create from "../../components/Create";
import FullScreenModal from "../../components/FullScreenModal";
import CreatePostModal from "../../components/CreatePostModal";
//
import { logOut } from "../../redux/action/auth";
import { setPostData, resetPostData } from "../../redux/action/createPost";

function Dashboard(props) {
  const { auth, logOut, resetPostData, setPostData, creatingPost } = props;
  const [showCreateModal, setshowCreateModal] = useState(false);
  console.log("dashboard auth data", auth);
  const { displayName, photoURL } = auth;

  return (
    <div>
      <Navbar logOut={logOut} />
      <div className="dashboard_main_cont">
        <div className="dashboard_sidebar dashboard_left_sidebar "></div>
        {/*  */}
        <div className="dashboard_centered_cont">
          <div className="dashboard_centered_main_cont">
            <Create
              displayName={displayName}
              photoURL={photoURL}
              onCraete={() => setshowCreateModal(true)}
            />
            {creatingPost === true ? (
              <div className="create">
                <span>Creating Post ...</span>
              </div>
            ) : null}
          </div>
        </div>
        {/*  */}
        <div className="dashboard_sidebar dashboard_right_sidebar"></div>
      </div>
      <FullScreenModal
        onClose={(e) => {
          resetPostData();
          setshowCreateModal(false);
        }}
        onMinus={(e) => {
          setshowCreateModal(false);
        }}
        show={showCreateModal}
      >
        <CreatePostModal
          setshowCreateModal={(e) => {
            setshowCreateModal(false);
          }}
          auth={auth}
        />
      </FullScreenModal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
  creatingPost: state.createPost.creating,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: (data) => dispatch(logOut(data)),
  resetPostData: (data) => dispatch(resetPostData(data)),
  setPostData: (data) => dispatch(setPostData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
