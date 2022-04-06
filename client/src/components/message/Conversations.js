import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./conversations.css";
import { format } from "timeago.js";
import { createMessage, getMessage } from "../../actions/message";
import { io } from "socket.io-client";

const Conversations = ({ senderId, currentChat }) => {
  const { messages } = useSelector((state) => state.messages);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({
    senderId: "",
    text: "",
    time: "",
  });

  const { conversationId } = useParams();

  const dispatch = useDispatch();
  const socket = useRef();
  const ref = useRef();

  const [conversations, setConversations] = useState("");

  useEffect(() => {
    setConversations(messages);
  }, [messages]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        time: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setConversations((prev) => [...prev, arrivalMessage]);
    // ref.current.scrollIntoView({ block: "end", inline: "nearest" });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", senderId);
  }, [senderId]);

  useEffect(() => {
    dispatch(getMessage(conversationId));
    // ref.current.scrollIntoView({ block: "end", inline: "nearest" });
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
      conversationId,
      senderId,
      text: message,
      time: Date.now(),
    };

    dispatch(createMessage(newMessage));
    setConversations((prev) => [...prev, newMessage]);
    setMessage("");
    // ref.current.scrollIntoView({ block: "end", inline: "nearest" });
  };

  return (
    <>
      <div className="chats">
        {conversations?.length > 0 ? (
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
          <span>no msz</span>
        )}
        {/* <p ref={ref}></p> */}
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
