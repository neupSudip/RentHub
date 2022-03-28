import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../actions/message";
import Connections from "./Connections";
import Conversations from "./Conversations";
import "./message.css";

const Message = () => {
  const [curretChat, setCurrentChat] = useState();

  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversation(user?._id));
  }, [window.location.pathname]);

  const { conversations } = useSelector((state) => state.messages);

  return (
    <div className="message">
      <div className="connections">
        {!conversations?.length ? (
          <h1>There is no conversation</h1>
        ) : (
          conversations?.map((con) => (
            <Connections
              key={con._id}
              conversation={con}
              setCurrentChat={setCurrentChat}
              userId={user._id}
            />
          ))
        )}
      </div>
      <div className="conversation">
        {curretChat ? (
          <Conversations senderId={user._id} currentChat={curretChat} />
        ) : (
          <span>Hello</span>
        )}
      </div>
    </div>
  );
};

export default Message;
