import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Post from "./Post";

function Profile({ setCurrentId }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const allPosts = useSelector((state) => state.posts);

  const posts = allPosts.filter((post) => post.creatorId === user?.result._id);

  const dispatch = useDispatch();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
  };
  return (
    <div>
      <button onClick={logout}>Log Out</button>

      <div className="grid-container">
        {!posts.length ? (
          <h1>There is no posts</h1>
        ) : (
          posts.map((post) => (
            <Post key={post._id} post={post} setCurrentId={setCurrentId} />
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
