import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./navbar.css";

import logo from "../../images/logo1.png";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div className="nav-bar">
      <div className="left-nav">
        <Link to="/">
          <img className="nav-logo" src={logo} alt="RentHub" />
        </Link>
      </div>
      {user ? (
        <div className="right-nav">
          <ul>
            <li>
              <Link to="/createpost">Create</Link>
            </li>
            <li>
              <Link to="/message">Message</Link>
            </li>
            <li>
              <Link to="/profile">
                {user.result.imageUrl || user.result.image ? (
                  <img
                    className="profile-image"
                    alt={user.result.name.charAt(0)}
                    src={user.result.imageUrl || user.result.image}
                  />
                ) : (
                  <p className="profile-image"> {user.result.name.charAt(0)}</p>
                )}
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <button className="signin-btn">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
