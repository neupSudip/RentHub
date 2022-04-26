import React, { useState, useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { Helmet } from "react-helmet";
import PasswordChecklist from "react-password-checklist";

import { signup } from "../../actions/auth";
import "./auth.css";
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);

  const handleChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchAuth = () => {
    setIsVerify((preState) => !preState);
  };

  const googleSuccess = async (res) => {
    console.log(res);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rx = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

    const ok = rx.test(formDate.password);

    if (ok && formDate.image) {
      try {
        const newError = await dispatch(signup(formDate, history));
        setError(newError);
      } catch (error) {
        console.log(error);
      }
    }
    if (!formDate.image) {
      setError("Image is Required");
    }
  };

  const handleKey = async (e) => {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <Helmet>
        <title>SignUp | RentHub</title>
      </Helmet>
      <form className="form-container" onSubmit={handleSubmit}>
        {error && (
          <div className="error-box">
            <h2 className="error-message">{error}</h2>
            <h1 onClick={() => setError("")}>&#10008;</h1>
          </div>
        )}
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
                ref={autoFocus}
                required
              />

              <i
                onClick={handleShowPassword}
                className="fa fa-eye icon fa-2x"
              ></i>
              <PasswordChecklist
                rules={["minLength", "number", "capital", "lowercase"]}
                minLength={8}
                value={formDate.password}
                messages={{
                  minLength: "Minimum password length 8",
                  number: "Must have a number",
                  capital: "Must have a capital letter",
                  lowercase: "Must have a lowercase letter",
                }}
                onKeyPress={handleKey}
              />
            </div>
            <select
              onChange={(e) =>
                setFormData({ ...formDate, userType: e.target.value })
              }
            >
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>

            <button className="btn-signup" type="submit">
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
              ref={autoFocus}
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

            <select
              onChange={(e) =>
                setFormData({ ...formDate, userType: e.target.value })
              }
            >
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>

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

              <i
                onClick={handleShowPassword}
                className="fa fa-eye icon fa-2x"
              ></i>

              <PasswordChecklist
                rules={["minLength", "number", "capital", "lowercase"]}
                minLength={8}
                value={formDate.password}
                messages={{
                  minLength: "Minimum Password length 8",
                  number: "Must have a number",
                  capital: "Must have a capital letter",
                  lowercase: "Must have a lowercase letter",
                }}
                onKeyPress={handleKey}
              />
            </div>

            <div className="signup-image">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formDate, image: base64 })
                }
              />
            </div>

            <button className="btn-signup" type="submit">
              Sign Up
            </button>
            <GoogleLogin
              clientId={AUTH_TOKEN}
              render={(renderProps) => (
                <button
                  className="google-btn"
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
            <span className="switch-auth">
              <Link to="/login">
                Already have account?
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign
                in
              </Link>
            </span>
          </>
        )}
      </form>
    </div>
  );
}

export default SignUp;
