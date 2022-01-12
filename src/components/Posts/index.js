import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import { auth, db, storage } from "../../config";
import { connect } from "react-redux";
import Card from "./Card";

function Posts(props) {
  const { user } = props;
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(posts.length < 1);
    // fetch posts from firebase
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snp) => {
        if (loading) setloading(false);
        setposts(
          snp.docs.map((doc) => ({
            id: doc.id,
            user_name: doc.data().user_name,
            user_uid: doc.data().user_uid,
            user_image: doc.data().user_image,
            user_image: doc.data().user_image,
            post_image: doc.data().post_image,
            createdAt: doc.data().createdAt,
            title: doc.data().title,
          }))
        );
      });
  }, []);
  console.log("posts component posts", posts);
  return (
    <Fragment>
      {posts.length > 0 ? (
        posts.map((post, index) => {
          return <Card key={index} user={user} post={post} />;
        })
      ) : loading ? (
        <div className="create flex-center">
          <span>Loading ...</span>
        </div>
      ) : (
        <div className="create flex-center">
          <h4>Be the one to post.</h4>
        </div>
      )}
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
