import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PostDetail from "./components/PostDetail/PostDetail";
import Welcome from "./components/Landing/Welcome";
import Verify from "./components/Auth/Verify";
import Message from "./components/message/Message";
import Forget from "./components/Auth/Forget";

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
          path="/posts/page/:id"
          exact
          element={!user ? <Navigate to="/welcome" /> : <Posts />}
        />

        <Route
          path="/posts/search"
          exact
          element={!user ? <Navigate to="/welcome" /> : <Posts />}
        />
        <Route
          path="/post/:id"
          exact
          element={!user ? <Navigate to="/welcome" /> : <PostDetail />}
        />

        <Route
          path="/message/:conversationId"
          exact
          element={!user ? <Navigate to="/welcome" /> : <Message />}
        />

        <Route
          path="/message"
          exact
          element={!user ? <Navigate to="/welcome" /> : <Message />}
        />
        <Route
          path="/updatepost"
          exact
          element={
            !user ? (
              <Navigate to="/welcome" />
            ) : !currentId ? (
              <Navigate to="/profile" />
            ) : (
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            )
          }
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

        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/forget-password/:id" element={<Forget />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
