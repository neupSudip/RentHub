import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
  };
  return (
    <div className="profile">
      this is profile page
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default Profile;
