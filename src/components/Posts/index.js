import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import { auth, db, storage } from "../../config";
import Card from "./Card";
export default function Posts() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    // fetch posts from firebase
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snp) => {
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
      {posts.map((post, index) => {
        return <Card post={post} />;
      })}
    </Fragment>
  );
}
