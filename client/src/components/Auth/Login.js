import React, { useState, useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import { AUTH_TOKEN } from "../../config.file";

import { signin, signingoogle, checkSend } from "../../actions/auth";
import "./auth.css";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formDate, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    const email = res?.profileObj?.email;
    try {
      dispatch(signingoogle({ email }, history));
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("google sign in fail");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newError = await dispatch(signin(formDate, history));
      setError(newError);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = async (e) => {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };

  const handleForget = async () => {
    if (formDate.email) {
      try {
        const response = await dispatch(checkSend(formDate.email));
        setError(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Please provide your email");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login | RentHub</title>
      </Helmet>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {error && (
          <div className="error-box">
            <h2 className="error-message">{error}</h2>
            <h1 onClick={() => setError("")}>&#10008;</h1>
          </div>
        )}

        <p>Valid Email Address</p>
        <input
          type="email"
          name="email"
          placeholder="Email Address*"
          label="Email Address"
          onChange={handleChange}
          onKeyPress={handleKey}
          ref={autoFocus}
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
            onKeyPress={handleKey}
            required
          />

          <i onClick={handleShowPassword} className="fa fa-eye icon fa-2x"></i>
        </div>

        <button className="btn-signin" type="submit">
          Sign In
        </button>
        <GoogleLogin
          clientId={AUTH_TOKEN}
          render={(renderProps) => (
            <button
              className="google-btn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <i className="fa fa-google fa-fw"></i> Login with Google+
            </button>
          )}
          buttonText="Login"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
        />

        <h3 className="forget-password" onClick={handleForget}>
          Forget password ?
        </h3>

        <span className="switch-auth">
          <Link to="/signup">
            Does not have account?
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
