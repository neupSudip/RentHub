import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userVerify } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./auth.css";

const Verify = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const ary = window.location.pathname.split("/");
  const hash = ary[ary.length - 1];

  const handleClick = async () => {
    try {
      const response = await dispatch(userVerify(hash));
      setMessage(response);
    } catch (error) {
      console.log(console.error());
    }
  };

  useEffect(() => {
    if (message === "Redirecting...") {
      history("/login");
    }
  }, [message]);

  return (
    <div style={{ textAlign: "center" }}>
      <Helmet>
        <title>Verify | RentHub</title>
      </Helmet>
      {message && (
        <div className="error-box">
          <h2 className="error-message">{message}</h2>
          <h1 onClick={() => setMessage("")}>&#10008;</h1>
        </div>
      )}

      <button className="btn-reset" onClick={handleClick}>
        Verify
      </button>
      <br />
      <br />
      <h1>Please click verify button to verify</h1>
    </div>
  );
};

export default Verify;
