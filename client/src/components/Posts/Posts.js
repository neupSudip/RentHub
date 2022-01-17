import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Posts = () => {
  const allPosts = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const query = useQuery();
  const history = useNavigate();

  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const serachQuery = query.get("searchQuery");

  const searchPosts = () => {
    console.log(location, title, tag);
  };

  const posts = allPosts.filter(
    (post) =>
      post.creatorId !== user?._id && post.creatorType !== user?.userType
  );
  return (
    <div>
      {user && (
        <div className="search-bar">
          <div className="search-fields">
            <input
              type="text"
              name="location"
              placeholder="Location"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              name="title"
              placeholder="Rooms/Titles"
              label="Rooms"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              label="Tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button onClick={searchPosts} className="search-button">
              Search
            </button>
          </div>
        </div>
      )}

      <div>
        {!user ? (
          <h1>Please Login to see Features</h1>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Posts;
