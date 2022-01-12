import { firestore } from "firebase";
import React, { useEffect, useMemo, useState } from "react";
import { BiUser, BiSend } from "react-icons/bi";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { db, firebase } from "../../config";
import CommentCard from "./CommentCard";
import UserIcon from "./UserIcon";

function Card(props) {
  const { post, key, user } = props;
  const { user_name, user_image, createdAt, post_image, title, user_uid, id } =
    post;
  //
  const postRef = db.collection("posts").doc(id);
  //
  const [commentInput, setcommentInput] = useState("");
  const [liked, setliked] = useState(false);
  const [likes, setlikes] = useState({});
  const [comments, setcomments] = useState([]);
  const [commentsToShow, setcommentsToShow] = useState([]);
  const [showCommentBox, setshowCommentBox] = useState(false);
  const [postingComment, setpostingComment] = useState(false);
  //
  function timeSince(sec = 0) {
    let date = new Date(sec * 1000);
    var seconds = Math.ceil((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.ceil(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.ceil(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.ceil(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.ceil(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.ceil(interval) + " minutes ago";
    }
    if (interval < 0) {
      return " just now";
    }
    return Math.ceil(seconds) + " seconds ago";
  }

  const handleLike = async () => {
    console.log("handle like working");
    setliked(true);
    await postRef
      .collection("likes")
      .doc(user.uid)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      .then((e) => {
        console.log("handle like .then ", e);
        setliked(true);
      })
      .catch((err) => {
        console.log("handle like .catch ", err);
        setliked(false);
      });
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        likedPosts: firebase.firestore.FieldValue.arrayUnion(id),
      });
  };
  //
  const handleDislike = async () => {
    console.log("handle dislike working");
    setliked(false);
    await postRef
      .collection("likes")
      .doc(user.uid)
      .delete()
      .then((e) => {
        console.log("handle dislike .then ", e);
        setliked(false);
      })
      .catch((err) => {
        console.log("handle dislike .catch ", err);
        setliked(true);
      });
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        likedPosts: firebase.firestore.FieldValue.arrayRemove(id),
      });
  };
  //
  const placeComment = async () => {
    let commentText = commentInput;
    if (commentText) {
      let commentId = Math.random().toString(36).slice(2);
      setcommentInput("");
      setpostingComment(true);
      await postRef
        .collection("comments")
        .doc(commentId)
        .set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          comment: commentText,
        })
        .then((e) => {
          setpostingComment(false);
          setcommentInput("");
        })
        .catch(() => {
          setpostingComment(false);
          setcommentInput(commentText);
        });
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          postedComments: firebase.firestore.FieldValue.arrayUnion(id),
        });
    }
  };
  //
  const toggleLike = () => {
    if (liked) {
      handleDislike();
    } else {
      handleLike();
    }
  };
  //
  // fetch likes in real time
  useEffect(() => {
    postRef
      .collection("likes")
      .orderBy("createdAt", "desc")
      .onSnapshot((snp) => {
        // console.log("likes_ useEffect snapshot snp", id, snp);
        let likesObj = {};
        snp.docs.map((doc) => {
          console.log(
            "likes_ useEffect snapshot snp.docs.map doc.data()",
            doc.id,
            doc.data()
          );
          return (likesObj[doc.id] = {
            createdAt: doc.data().createdAt,
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
          });
        });
        setlikes(likesObj);
      });
  }, [id]);
  //
  useMemo(() => {
    if (commentsToShow.length < 1 && comments.length > 0) {
      setcommentsToShow(comments.slice(0, 2));
    }
  }, [comments]);
  // fetch comments in real time
  useEffect(() => {
    postRef
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((snp) => {
        setcomments(
          snp.docs.map((doc) => {
            return {
              createdAt: doc.data().createdAt,
              uid: doc.data().uid,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              comment: doc.data().comment,
            };
          })
        );
      });
  }, [id]);
  useMemo(() => {
    if (Object.keys(likes).length > 0) {
      if (likes[user.uid]) {
        setliked(true);
      } else {
        setliked(false);
      }
    } else {
      setliked(false);
    }
  }, [likes, id]);
  //
  console.log("card comments ", comments);
  // show comment box handler
  const setshowCommentBoxHandler = () => {
    setshowCommentBox(!showCommentBox);
  };
  // on key press handler
  const onKeyPressHandler = (e) => {
    console.log("onKeyPressHandler e", e.key);
    if (e.key === "Enter") {
      placeComment();
    }
  };
  //
  console.log("card.js createdAt", createdAt);
  console.log("card.js post", post);
  return (
    <div className="posts" key={id}>
      <div className="post__header">
        <div className=" post__header_userinfo_wrapper cursorPointer">
          <UserIcon src={user_image} />
          <div>
            <div className="post__header_user_name">{user_name}</div>
            <div className="post__header_time">
              {timeSince(createdAt ? createdAt.seconds : 0)}
            </div>
          </div>
        </div>
      </div>
      {/* reactions  */}
      <div className="posts__img">
        <div className=" post__header_userinfo_wrapper ">
          <span className="posts__header-name">{title}</span>
        </div>
        {post_image ? (
          <div className="post__image_wrapper">
            <img src={post_image} alt="" />
          </div>
        ) : null}
      </div>
      <div className="post_reaction_main_wrapper">
        <button
          onClick={toggleLike}
          className="post_reaction_button cursorPointer"
        >
          {liked ? (
            <FaHeart className="post_reaction_button_icon cursorPointer" />
          ) : (
            <FaRegHeart className="post_reaction_button_icon cursorPointer" />
          )}
          Like
          {Object.keys(likes).length ? ` (${Object.keys(likes).length})` : ""}
        </button>
        <button
          onClick={setshowCommentBoxHandler}
          className="post_reaction_button cursorPointer"
        >
          <FaRegComment className="post_reaction_button_icon cursorPointer" />
          Comments{comments.length ? ` (${comments.length})` : ""}
        </button>
      </div>
      {showCommentBox ? (
        <>
          <hr />
          <div className="post_comment_main_wrapper">
            {commentsToShow.map((item, index) => {
              return (
                <CommentCard
                  postingComment={postingComment}
                  timeSince={(e) => timeSince(e)}
                  item={item}
                />
              );
            })}
            {comments.length > 2 ? (
              <div className="ph-1 p-_5 align-horizontal-end">
                <button
                  onClick={() =>
                    setcommentsToShow(
                      commentsToShow.length < 3
                        ? comments
                        : comments.slice(0, 2)
                    )
                  }
                >
                  Show {commentsToShow.length < 3 ? "All" : "Less"} Comments
                </button>
              </div>
            ) : null}
            {postingComment ? (
              <div className="ph-1 p-_5 ">
                <span>Commenting...</span>
              </div>
            ) : null}

            <div className="flex-row post_comment_input">
              <input
                value={commentInput}
                onChange={(e) => setcommentInput(e.target.value)}
                placeholder="Write a comment..."
                onKeyPress={onKeyPressHandler}
              />
              <button onClick={placeComment} className="flex-center">
                <BiSend className="navbar__icons" color="white" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Card;
