import React from "react";
import "./conversations.css";
import { format } from "timeago.js";

const Conversations = ({ own }) => {
  return (
    <div className={own ? "conversation own" : "conversation"}>
      <p className="text">
        Hello my name is sudip i am from chhaughada from nuwakot living in
        kathmandu
      </p>
      <p className="time">1 sec ago</p>
    </div>
  );
};

export default Conversations;
