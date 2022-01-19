import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Post = ({ post }) => {
  const date = moment(post.createdAt).format("DD MMM, YYYY");

  const history = useNavigate();

  const openPost = () => {
    history(`/posts/${post._id}`);
  };

  return (
    <div onClick={openPost} className="card">
      <img className="image" src={post.image} alt={post.title} />
      <h1> {post.title}</h1>
      <h1>{post.creatorName}</h1>
      <h1> {`NRP ${post.amount}`}</h1>
      <h1>{post.location}</h1>
      <h1>{post.tags.map((tag) => `#${tag} `)}</h1>
      <h1>{date}</h1>
    </div>
  );
};

export default Post;
