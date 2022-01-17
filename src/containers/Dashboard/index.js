import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./styles.css";
//
import { connect } from "react-redux";
//
import Create from "../../components/Create";
import FullScreenModal from "../../components/FullScreenModal";
import CreatePostModal from "../../components/CreatePostModal";
import Posts from "../../components/Posts";
//
import { logOut } from "../../redux/action/auth";
import { setPostData, resetPostData } from "../../redux/action/post";
//
import RightCont from "../../components/DashboardRight";
import { Affix } from "antd";

//
function Dashboard(props) {
  const {
    currentUser,
    auth,
    logOut,
    resetPostData,
    setPostData,
    creatingPost,
  } = props;
  const [showCreateModal, setshowCreateModal] = useState(false);
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
              onCraete={() => setshowCreateModal(creatingPost !== true)}
            />
            {creatingPost === true ? (
              <div className="create">
                <span>Creating Post ...</span>
              </div>
            ) : null}
            <Posts />
          </div>
        </div>
        {/*  */}
        <div className="dashboard_sidebar dashboard_right_sidebar">
          {/* <Affix offsetTop={50}> */}
          {currentUser.uid ? <RightCont /> : null}
          {/* </Affix> */}
        </div>
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
  creatingPost: state.post.creating,
  currentUser: state.global.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: (data) => dispatch(logOut(data)),
  resetPostData: (data) => dispatch(resetPostData(data)),
  setPostData: (data) => dispatch(setPostData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
