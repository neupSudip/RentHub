import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Posts setCurrentId={setCurrentId} />} />
        <Route
          path="/createpost"
          element={<Form currentId={currentId} setCurrentId={setCurrentId} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
