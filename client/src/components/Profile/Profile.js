import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserPosts, getSavedPosts } from "../../actions/posts";
import "./profile.css";

import Post from "./Post";

function Profile({ setCurrentId, setCurrentUser }) {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [type, setType] = useState("user");
  const [removeId, setRemoveId] = useState(null);
  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === "user") {
      dispatch(getUserPosts(user?.result._id, setLoading));
    }
    if (type === "saved") {
      dispatch(getSavedPosts(user?.result._id, setLoading));
    }
  }, [type]);

  useEffect(() => {
    if (removeId) {
      dispatch(getSavedPosts(user?.result._id, setLoading));
      dispatch({ type: "REMOVE_SAVED_POST", payload: removeId });
      setRemoveId(null);
    }

    if (postId) {
      dispatch(getUserPosts(user?.result._id, setLoading));
      dispatch({ type: "DELETE", payload: postId });
      setPostId(null);
    }
  }, [removeId, postId]);

  const { userPosts } = useSelector((state) => state.posts);
  const { savedPosts } = useSelector((state) => state.posts);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
    setCurrentUser(null);
  };

  const changeType = (type) => {
    setType(type);
  };
  return (
    <div>
      <button className="logout-btn" onClick={logout}>
        Log Out
      </button>
      <div className="profile">
        <img
          className="profile-img"
          src={user.result.image}
          alt={user.result.name}
        />

        <h1>{`${user.result.name} (${user.result.userType})`}</h1>
      </div>

      <h1 className="my-post" onClick={() => changeType("user")}>
        My Posts
      </h1>

      <h1 className="saved_post" onClick={() => changeType("saved")}>
        saved posts
      </h1>

      <div className="grid-container">
        {loading && <h1>loading...</h1>}
        {type === "user" ? (
          <>
            {!userPosts?.length ? (
              <h1>There is no userPosts</h1>
            ) : (
              userPosts?.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  setCurrentId={setCurrentId}
                  userId={user?.result._id}
                  type={type}
                  setPostId={setPostId}
                  setRemoveId={setRemoveId}
                />
              ))
            )}
          </>
        ) : (
          <>
            {savedPosts?.length > 0 && Array.isArray(savedPosts) ? (
              savedPosts?.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  setCurrentId={setCurrentId}
                  userId={user?.result._id}
                  type={type}
                  setPostId={setPostId}
                  setRemoveId={setRemoveId}
                />
              ))
            ) : (
              <h1>There is no saved Posts</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
