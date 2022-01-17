import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";

import { deletePost } from "../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const date = moment("2018-05-18T04:00:00.000Z").format("DD MMM, YYYY");

  const updatePost = () => {
    setCurrentId(post._id);
  };

  return (
    <div className="grid-item">
      <img className="profile-post-img" src={post.image} alt={post.title} />
      <h1> {post.title}</h1>
      <h1> {`NRP ${post.amount}`}</h1>
      <h1>{post.location}</h1>
      <h1>{post.tags.map((tag) => `#${tag} `)}</h1>
      <h1>{date}</h1>
      <button onClick={updatePost}>
        <Link to="/createpost">update</Link>
      </button>
      <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
    </div>
  );
};

export default Post;
