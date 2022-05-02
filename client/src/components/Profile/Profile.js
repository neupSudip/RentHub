import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getUserPosts, getSavedPosts } from "../../actions/posts";
import "./profile.css";

import Post from "./Post";
import SavedPosts from "./SavedPosts";

function Profile({ setCurrentId, setCurrentUser }) {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [type, setType] = useState("user");
  const [removeId, setRemoveId] = useState(null);
  const [postId, setPostId] = useState(null);
  const [hideId, setHideId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showPost, setShowPost] = useState(false);

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
      dispatch({ type: "REMOVE_SAVED_POST", payload: removeId });
      // dispatch(getSavedPosts(user?.result._id, setLoading));
      setRemoveId(null);
    }

    if (postId) {
      // dispatch(getUserPosts(user?.result._id, setLoading));
      dispatch({ type: "DELETE", payload: postId });
      setPostId(null);
    }

    if (hideId) {
      dispatch(getUserPosts(user?.result._id));
      dispatch({ type: "HIDE_POST", payload: hideId });
      setHideId(null);
    }
  }, [removeId, postId, hideId]);

  const { userPosts, savedPosts, bookedPosts } = useSelector(
    (state) => state.posts
  );

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
    setCurrentUser(null);
  };

  const changeType = (type) => {
    setType(type);
  };

  const handleShow = () => {
    setShowPost((prev) => !prev);
  };

  return (
    <div className="profile-btn">
      <button className="logout-btn" onClick={logout}>
        Log Out
      </button>

      {user?.result.userType === "renter" && (
        <button className="book-show-btn" onClick={handleShow}>
          Booked posts
        </button>
      )}

      {showPost && bookedPosts?.length > 0 && Array.isArray(bookedPosts) && (
        <div className="booked-posts">
          {bookedPosts?.map((post) => (
            <div className="booked-post" key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.creatorName}</p>
              <p>{post.location}</p>
            </div>
          ))}
        </div>
      )}

      {showPost && !bookedPosts?.length > 0 && Array.isArray(bookedPosts) && (
        <h1>No Booked Posts</h1>
      )}

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
        {loading ? (
          <CircularProgress
            style={{ position: "absolute", top: "50vh", left: "50%" }}
            size="8rem"
            sx={{ color: "green" }}
          />
        ) : (
          <>
            {type === "user" ? (
              <>
                {!userPosts?.length ? (
                  <h1 style={{ margin: "2rem auto" }}>There is no userPosts</h1>
                ) : (
                  userPosts?.map((post) => (
                    <Post
                      key={post?._id}
                      post={post}
                      setCurrentId={setCurrentId}
                      userId={user?.result._id}
                      setPostId={setPostId}
                      setHideId={setHideId}
                    />
                  ))
                )}
              </>
            ) : (
              <>
                {savedPosts?.length > 0 && Array.isArray(savedPosts) ? (
                  savedPosts?.map((post) => (
                    <SavedPosts
                      key={post?._id}
                      post={post}
                      userId={user?.result._id}
                      setRemoveId={setRemoveId}
                    />
                  ))
                ) : (
                  <h1 style={{ margin: "2rem auto" }}>
                    There is no saved Posts
                  </h1>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
