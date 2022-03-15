import React from "react";
import Conversations from "./Conversations";
import Connections from "./Connections";
import "./message.css";

function Message() {
  return (
    <div className="message">
      <div className="connections">
        <Connections />
        <Connections />
        <Connections />
        <Connections />
      </div>
      <div className="conversations">
        <Conversations />
        <Conversations own={true} />
        <Conversations />
        <Conversations />
      </div>
    </div>
  );
}

export default Message;
