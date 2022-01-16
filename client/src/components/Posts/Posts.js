import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <div>
      <SearchBar />

      {!posts.length ? (
        <h1>There is no posts</h1>
      ) : (
        posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))
      )}
    </div>
  );
};

export default Posts;
