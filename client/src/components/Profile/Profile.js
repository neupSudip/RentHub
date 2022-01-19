import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../../actions/posts";
import "./style.css";

import Post from "./Post";

function Profile({ setCurrentId, setCurrentUser }) {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    dispatch(getUserPosts(user?.result._id));
  }, [window.location.pathname]);

  const { userPosts } = useSelector((state) => state.posts);
  console.log(userPosts);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
    setCurrentUser(null);
  };
  return (
    <div>
      <button onClick={logout}>Log Out</button>

      <div className="grid-container">
        {!userPosts?.length ? (
          <h1>There is no userPosts</h1>
        ) : (
          userPosts?.map((post) => (
            <Post key={post._id} post={post} setCurrentId={setCurrentId} />
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
