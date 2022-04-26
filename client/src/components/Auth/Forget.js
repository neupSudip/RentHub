import React, { useState, useCallback, useEffect } from "react";
import PasswordChecklist from "react-password-checklist";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { forgetPassword } from "../../actions/auth";
import "./auth.css";

const Forget = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);

  const ary = window.location.pathname.split("/");
  const hash = ary[ary.length - 1];

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const hashAndPass = {
    hash: hash,
    pass: password,
  };

  const handleClick = async () => {
    const rx = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

    const ok = rx.test(password);
    if (ok) {
      try {
        const response = await dispatch(forgetPassword(hashAndPass));
        setMessage(response);
      } catch (error) {
        console.log(console.error());
      }
    }
  };

  useEffect(() => {
    if (message === "Redirecting...") {
      history("/login");
    }
  }, [message]);

  return (
    <div className="form-container">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      {message && (
        <div className="error-box">
          <h2 className="error-message">{message}</h2>
          <h1 onClick={() => setMessage("")}>&#10008;</h1>
        </div>
      )}
      <h2 style={{ textAlign: "center" }}>Create Password</h2>
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

        <i onClick={handleShowPassword} className="fa fa-eye icon fa-2x"></i>
        <PasswordChecklist
          rules={["minLength", "number", "capital", "lowercase"]}
          minLength={8}
          value={password}
          messages={{
            minLength: "Minimum password length 8",
            number: "Must have a number",
            capital: "Must have a capital letter",
            lowercase: "Must have a lowercase letter",
          }}
        />
      </div>

      <button className="btn-reset" onClick={handleClick}>
        Reset Password
      </button>
    </div>
  );
};

export default Forget;
