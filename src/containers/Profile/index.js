import React from "react";
import { logOut } from "../../redux/action/auth";
import { connect } from "react-redux";
import "./styles.css";
import DashboardRight from "../../components/DashboardRight";
//

//
function Profile(props) {
  const { logOut } = props;
  return (
    <div className="dashboard_main_cont">
      <div className="dashboard_sidebar dashboard_left_sidebar "></div>
      {/*  */}
      <div className="dashboard_centered_cont">
        <div className="dashboard_centered_main_cont">
          <button onClick={logOut}>Log Out</button>{" "}
          <div className="create">
            <DashboardRight />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="dashboard_sidebar dashboard_right_sidebar"></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
  creatingPost: state.post.creating,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: (data) => dispatch(logOut(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
