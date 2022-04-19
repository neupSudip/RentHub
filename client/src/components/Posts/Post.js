import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import requiredImage from "../../images/required.jpg";

import "./posts.css";

const Post = ({ post }) => {
  const date = moment(post.createdAt).format("DD MMM, YYYY");

  const history = useNavigate();

  const openPost = () => {
    history(`/post/${post._id}`);
  };

  return (
    <div onClick={openPost} className="card">
      {post.image ? (
        <img className="image" src={post.image} alt={post.title} />
      ) : (
        <img className="image" src={requiredImage} alt={post.title} />
      )}

      {post.people ? (
        <h1>{`${post.title}, ${post.people} people`}</h1>
      ) : (
        <h1> {post.title}</h1>
      )}
      <h1>{post.creatorName}</h1>
      <h3> {`NRP ${post.amount} (${post.negotiable})`}</h3>

      <h3>{post.location}</h3>
      <h3>{post.tags.map((tag) => `#${tag} `)}</h3>
      <h3>{date}</h3>
    </div>
  );
};

export default Post;
