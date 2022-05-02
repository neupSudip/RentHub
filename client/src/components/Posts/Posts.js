import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "./Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Helmet } from "react-helmet";

import "./posts.css";
import Footer from "../Footer/Footer";

const Posts = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const userType = user.userType;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (window.location.pathname === "/") {
      dispatch(getPosts(userType, setLoading));
    }
  }, [window.location.pathname]);

  const searchPosts = () => {
    if (location.trim() || title.trim() || tag) {
      dispatch(
        getPostsBySearch({ location, title, tag, userType }, setLoading)
      );
      history(
        `/posts/search?location=${location || "none"}&title=${
          title || "none"
        }&tags=${tag || "none"}`
      );
    } else {
      history("/");
    }
  };

  const handleKey = async (e) => {
    if (e.charCode === 13) {
      searchPosts();
    }
  };

  const { posts } = useSelector((state) => state.posts);

  const totalPosts = posts?.length;
  const lastPost = page * 8;
  const firstPost = lastPost - 8;
  const displayPosts = posts?.slice(firstPost, lastPost);

  const paginate = (page) => {
    setPage(page);
  };

  console.log(displayPosts);

  return (
    <div>
      <Helmet>
        <title>RentHub.com</title>
      </Helmet>
      <div className="search-bar">
        <div className="search-fields">
          <input
            type="text"
            name="location"
            placeholder="Location"
            label="Location"
            value={location}
            onKeyPress={handleKey}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            name="title"
            placeholder="Rooms/Titles"
            label="Rooms"
            value={title}
            onKeyPress={handleKey}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            label="Tags"
            value={tag}
            onKeyPress={handleKey}
            onChange={(e) => setTag(e.target.value)}
          />
          <button onClick={searchPosts} className="search-button">
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <CircularProgress
          style={{ position: "absolute", top: "50vh", left: "50%" }}
          size="8rem"
          sx={{ color: "green" }}
        />
      ) : (
        <div className="cards">
          {!displayPosts.length ? (
            <h1 style={{ height: "20vh" }}>Sorry !! No Posts Found </h1>
          ) : (
            displayPosts?.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
      )}
      <Pagination totalPosts={totalPosts} paginate={paginate} />

      <Footer />
    </div>
  );
};

export default Posts;
