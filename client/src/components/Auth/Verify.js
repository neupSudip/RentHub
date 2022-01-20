import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userVerify } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

//http://localhost:3000/verify/61e92c4ebcd7e55e8d2497fb95ae732bcc0e9e86ad5bfc06cd13fec44434e465
const Verify = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const hash = window.location.pathname.slice(8, 72);

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
    <div>
      <button onClick={handleClick}>Verify</button>
      <br />
      Please click verify button to verify
      {message && <h1>{message}</h1>}
    </div>
  );
};

export default Verify;
