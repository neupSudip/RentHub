import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./conversations.css";
import { format } from "timeago.js";
import { createMessage, getMessage } from "../../actions/message";
import { io } from "socket.io-client";

const Conversations = ({ senderId, currentChat }) => {
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { conversationId } = useParams();

  const dispatch = useDispatch();
  const socket = useRef();

  const { messages } = useSelector((state) => state.messages);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", senderId);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [senderId]);

  useEffect(() => {
    dispatch(getMessage(conversationId));
  }, [conversationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find(
      (member) => member !== senderId
    );

    socket.current.emit("sendMessage", {
      senderId,
      receiverId,
      text: message,
    });

    const newMessage = {
      conversationId: conversationId,
      senderId: senderId,
      text: message,
    };

    dispatch(createMessage(newMessage));
    setMessage("");
  };

  // const [formName, setFormName] = useState("");
  // if (messages?.length < 8) {
  //   setFormName("absolute");
  // } else {
  //   setFormName("sticky");
  // }

  return (
    <>
      <div className="chats">
        {messages?.length > 0 ? (
          messages.map((con, i) => (
            <div
              key={i}
              className={con.senderId === senderId ? "chat own" : "chat friend"}
            >
              <p className="text">{con.text}</p>
              <p className="time">{format(con.time)}</p>
            </div>
          ))
        ) : (
          <span>no msz</span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          name="message"
          label="message"
          placeholder="type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button>send</button>
      </form>
    </>
  );
};

export default Conversations;
