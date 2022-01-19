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
import Welcome from "./components/Landing/Welcome";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/welcome"
          exact
          element={user ? <Navigate to="/" /> : <Welcome />}
        />

        <Route
          path="/"
          exact
          element={!user ? <Navigate to="/welcome" /> : <Posts />}
        />

        <Route
          path="/posts/search"
          exact
          element={!user ? <Navigate to="/welcome" /> : <Posts />}
        />
        <Route
          path="/posts/:id"
          exact
          element={!user ? <Navigate to="/welcome" /> : <PostDetail />}
        />
        <Route
          path="/createpost"
          exact
          element={
            !user ? (
              <Navigate to="/welcome" />
            ) : (
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            )
          }
        />
        <Route
          path="/signup"
          exact
          element={user ? <Navigate to="/welcome" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/welcome" /> : <Login />}
        />
        <Route
          path="/profile"
          exact
          element={
            !user ? (
              <Navigate to="/welcome" />
            ) : (
              <Profile
                setCurrentId={setCurrentId}
                setCurrentUser={setCurrentUser}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
