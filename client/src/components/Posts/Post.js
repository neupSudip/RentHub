import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import requiredImage from "../../images/require.png";

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
      <div className="title-details">
        {post.people ? (
          <h1>{`${post.title}, ${post.people} people`}</h1>
        ) : (
          <h1> {post.title}</h1>
        )}
        <h1>{`By ${post.creatorName}`}</h1>
        <h3 className="price-tag">
          {" "}
          {`NRP ${post.amount} (${post.negotiable})`}
        </h3>

        <h3>{post.location}</h3>
        <h3 className="blue-tag">{post.tags.map((tag) => `#${tag} `)}</h3>
        <h3>{date}</h3>
      </div>
    </div>
  );
};

export default Post;
