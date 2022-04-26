import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deletePost, hidePost } from "../../actions/posts";
import requiredImage from "../../images/required.jpg";
import "./profile.css";

import { Helmet } from "react-helmet";

const Post = ({ post, setCurrentId, setPostId, setHideId }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const date = moment().format("DD MMM, YYYY");

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

  const handleHide = () => {
    setHideId(post._id);
    dispatch(hidePost(post._id));
  };

  return (
    <div className="grid-item">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div onClick={openPost}>
        <img
          className="profile-post-img"
          src={post.image ? post.image : requiredImage}
          alt={post.title}
        />

        {post.people ? (
          <h1>{`${post.title}, ${post.people} people`}</h1>
        ) : (
          <h1> {post.title}</h1>
        )}
        <h3 className="price-tag">
          {" "}
          {`NRP ${post?.amount} (${post?.negotiable})`}
        </h3>
        <h3>{post?.location}</h3>

        <h3 className="blue-tag">{post?.tags.map((tag) => `#${tag} `)}</h3>
        <h3>{date}</h3>
      </div>

      {post.status ? (
        <button className="btn-hide" onClick={handleHide}>
          Hide
        </button>
      ) : (
        <button className="btn-show" onClick={handleHide}>
          Show
        </button>
      )}

      <button className="btn-update" onClick={updatePost}>
        update
      </button>
      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Post;
