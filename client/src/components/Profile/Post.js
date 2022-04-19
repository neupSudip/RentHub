import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useDispatch } from "react-redux";

import { deletePost, removeSavedPost } from "../../actions/posts";
import requiredImage from "../../images/required.jpg";

const Post = ({ post, setCurrentId, userId, type, setPostId, setRemoveId }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const date = moment("2018-05-18T04:00:00.000Z").format("DD MMM, YYYY");

  const updatePost = () => {
    setCurrentId(post._id);
    history("/updatepost");
  };

  const openPost = () => {
    history(`/post/${post._id}`);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this item?"
    );

    if (confirm) {
      setPostId(post._id);
      dispatch(deletePost(post._id));
    }
  };

  const handleRemove = () => {
    setRemoveId(post._id);
    dispatch(removeSavedPost(userId, post._id));
  };

  return (
    <div className="grid-item">
      <div onClick={openPost}>
        {type === "user" && (
          <img
            className="profile-post-img"
            src={post.image ? post.image : requiredImage}
            alt={post.title}
          />
        )}

        <h1> {post.title}</h1>
        <h3> {`NRP ${post.amount} (${post.negotiable})`}</h3>
        <h3>{post.location}</h3>
        {post.people && <h3>Person: {post.people}</h3>}
        <h3>{post.tags.map((tag) => `#${tag} `)}</h3>
        <h3>{date}</h3>
      </div>

      {type === "user" ? (
        <>
          <button onClick={updatePost}>update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  );
};

export default Post;
