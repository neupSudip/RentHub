import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

import { signup } from "../../actions/auth";
import "./style.css";
import { AUTH_TOKEN } from "../../config.file";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  image: "",
  userType: "owner",
  isVerified: false,
};

function SignUp() {
  const [isVerify, setIsVerify] = useState(false);

  const [formDate, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchAuth = () => {
    setIsVerify((preState) => !preState);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    switchAuth();
    setFormData({
      ...formDate,
      firstName: result.givenName,
      lastName: result.familyName,
      image: result.imageUrl,
      email: result.email,
      isVerified: true,
    });
  };

  const googleFailure = () => {
    console.log("google sign in fail");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(signup(formDate, history));
      console.log(formDate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {isVerify ? (
          <>
            <p>Create Password</p>
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password*"
                label="Password"
                onChange={handleChange}
                required
              />

              <i onClick={handleShowPassword} className="fa fa-user icon"></i>
            </div>
            <select
              onChange={(e) =>
                setFormData({ ...formDate, userType: e.target.value })
              }
            >
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>

            <button className="btn-submit" type="submit">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              label="First Name"
              onChange={handleChange}
              required
            />
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              label="Last Name"
              onChange={handleChange}
              required
            />
            <p>Valid Email Address</p>
            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              label="Email Address"
              onChange={handleChange}
              required
            />
            <p>Password</p>
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password*"
                label="Password"
                onChange={handleChange}
                required
              />

              <i onClick={handleShowPassword} className="fa fa-user icon"></i>
            </div>

            <select
              onChange={(e) =>
                setFormData({ ...formDate, userType: e.target.value })
              }
            >
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>

            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formDate, image: base64 })
              }
            />

            <button className="btn-submit" type="submit">
              Sign Up
            </button>
            <GoogleLogin
              clientId={AUTH_TOKEN}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign Up with Google
                </button>
              )}
              buttonText="Login"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
            <Link to="/login">Already have account Sign in</Link>
          </>
        )}
      </form>
    </div>
  );
}

export default SignUp;