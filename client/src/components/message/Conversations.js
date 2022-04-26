import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./conversations.css";
import { format } from "timeago.js";
import { createMessage, getMessage } from "../../actions/message";
import { io } from "socket.io-client";

const Conversations = ({ senderId, currentChat, friend }) => {
  const { conversationId } = useParams();
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const socket = useRef();
  const ref = useRef();

  useEffect(() => {
    dispatch(getMessage(conversationId, setLoading));
    ref?.current?.scrollIntoView({ block: "end", inline: "nearest" });
  }, [conversationId]);

  const { messages } = useSelector((state) => state.messages);

  useEffect(() => {
    setConversations(messages);
  }, [messages]);

  const [arrivalMessage, setArrivalMessage] = useState({
    senderId: "",
    text: "",
    time: "",
  });

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("arrival ", data);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        time: data.time,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setConversations((prev) => [...prev, arrivalMessage]);
    ref.current.scrollIntoView({ block: "end", inline: "nearest" });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", senderId);
  }, [senderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find(
      (member) => member !== senderId
    );

    socket.current.emit("sendMessage", {
      senderId,
      receiverId,
      text: message,
      time: Date.now(),
    });

    const newMessage = {
      conversationId,
      senderId,
      text: message,
      time: Date.now(),
    };

    dispatch(createMessage(newMessage));
    setConversations((pre) => [...pre, newMessage]);
    setMessage("");
    ref.current.scrollIntoView(false);
  };

  return (
    <>
      <div className="chats">
        <h1 className="friend-name">{friend}</h1>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", top: "50vh", left: "50%" }}
            size="8rem"
            sx={{ color: "green" }}
          />
        )}
        {!loading && conversations?.length > 0 ? (
          conversations.map((con, i) => (
            <div
              key={i}
              className={con.senderId === senderId ? "chat own" : "chat friend"}
            >
              <p className="text">{con.text}</p>
              <p className="time">{format(con.time)}</p>
            </div>
          ))
        ) : (
          <h2 className="no-conversation">You dont have any conversation</h2>
        )}
      </div>

      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          name="message"
          label="message"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button>send</button>
        <div className="ref" ref={ref}></div>
      </form>
    </>
  );
};

export default Conversations;
