import React from "react";
import moment from "moment";

import "./style.css";

const Post = ({ post }) => {
  const date = moment("2018-05-18T04:00:00.000Z").format("DD MMM, YYYY");

  return (
    <div>
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
