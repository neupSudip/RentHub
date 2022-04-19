import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userVerify } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

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
      {message && <h2 style={{ color: "red" }}>{message}</h2>}

      <button onClick={handleClick}>Verify</button>
      <br />
      <br />
      <h1>Please click verify button to verify</h1>
    </div>
  );
};

export default Verify;
