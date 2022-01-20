import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const Posts = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  // const query = useQuery();
  const history = useNavigate();
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  // const searchQuery = query.get("searchQuery");

  useEffect(() => {
    if (window.location.pathname === "/") {
      dispatch(getPosts());
    }
  }, [window.location.pathname]);

  const searchPosts = () => {
    if (location.trim() || title.trim() || tag) {
      dispatch(getPostsBySearch({ location, title, tag }));
      history(
        `/posts/search?location=${location || "none"}&title=${
          title || "none"
        }&tags=${tag || "none"}`
      );
    } else {
      history("/");
    }
  };

  const { posts } = useSelector((state) => state.posts);

  const post = posts?.filter(
    (p) => p.creatorId !== user?._id && p.creatorType !== user?.userType
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

      <div className="cards">
        {!user ? (
          <h1>Please Login to see Features</h1>
        ) : (
          post?.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Posts;
