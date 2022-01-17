import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PostDetail from "./components/PostDetail/PostDetail";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch, user]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Posts />} />
        <Route
          path="/posts/search"
          element={!user ? <Navigate to="/" /> : <Posts />}
        />
        <Route
          path="/posts/:id"
          element={!user ? <Navigate to="/" /> : <PostDetail />}
        />
        <Route
          path="/createpost"
          element={
            !user ? (
              <Navigate to="/" />
            ) : (
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            )
          }
        />
        <Route
          path="/signup"
          exact
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/profile"
          element={
            !user ? (
              <Navigate to="/" />
            ) : (
              <Profile setCurrentId={setCurrentId} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
