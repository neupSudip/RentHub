import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { getConversation } from "../../actions/message";
import Connections from "./Connections";
import Conversations from "./Conversations";
import "./message.css";
import Footer from "../Footer/Footer";

const Message = () => {
  const [curretChat, setCurrentChat] = useState();

  const [friend, setFriend] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversation(user?._id));
  }, [window.location.pathname]);

  const { conversations } = useSelector((state) => state.messages);

  return (
    <>
      <div className="message">
        <Helmet>
          <title>Message | RentHub</title>
        </Helmet>
        <div className="connections">
          {!conversations?.length ? (
            <h1>There is no conversation</h1>
          ) : (
            conversations?.map((con) => (
              <Connections
                key={con._id}
                conversation={con}
                setCurrentChat={setCurrentChat}
                setFriend={setFriend}
                userId={user._id}
              />
            ))
          )}
        </div>
        <div className="conversation">
          {curretChat ? (
            <Conversations
              senderId={user._id}
              currentChat={curretChat}
              friend={friend}
            />
          ) : (
            <h1 className="select-conversation">
              Please select a conversation to start
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Message;
