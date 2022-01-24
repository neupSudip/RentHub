import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useDispatch } from "react-redux";

import { deletePost } from "../../actions/posts";
import requiredImage from "../../images/required.jpg";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const date = moment("2018-05-18T04:00:00.000Z").format("DD MMM, YYYY");

  const updatePost = () => {
    setCurrentId(post._id);
    history("/updatepost");
  };

  const openPost = () => {
    history(`/posts/${post._id}`);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this item?"
    );

    if (confirm) {
      dispatch(deletePost(post._id));
    }
  };

  return (
    <div className="grid-item">
      {post.image ? (
        <img
          onClick={openPost}
          className="profile-post-img"
          src={post.image}
          alt={post.title}
        />
      ) : (
        <img
          className="profile-post-img"
          onClick={openPost}
          src={requiredImage}
          alt={post.title}
        />
      )}

      <h1> {post.title}</h1>
      <h3> {`NRP ${post.amount} (${post.negotiable})`}</h3>
      <h3>{post.location}</h3>
      {post.people && <h3>Person: {post.people}</h3>}
      <h3>{post.tags.map((tag) => `#${tag} `)}</h3>
      <h3>{date}</h3>
      <button onClick={updatePost}>update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;
