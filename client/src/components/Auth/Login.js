import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { AUTH_TOKEN } from "../../config.file";

import { signin, signingoogle } from "../../actions/auth";
import "./auth.css";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formDate, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {error && <h3 className="error-message">{error}</h3>}

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

          <i onClick={handleShowPassword} className="fa fa-eye icon fa-2x"></i>
        </div>

        <button className="btn-signin" type="submit">
          Sign In
        </button>
        <GoogleLogin
          clientId={AUTH_TOKEN}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign In with Google
            </button>
          )}
          buttonText="Login"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
        />
        <span className="switch-auth">
          <Link to="/signup">
            Does not have account? &nbsp;&nbsp;&nbsp;&nbsp; Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
