import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../actions/auth";
import "./connections.css";

const Connections = ({ conversation, setCurrentChat, userId }) => {
  const [userDetails, setUserDetails] = useState("");

  const dispatch = useDispatch();

  const history = useNavigate();

  const friendId = conversation.members.filter((c) => c !== userId);

  const temp = async () => {
    const response = await dispatch(getUserDetails(friendId[0]));
    setUserDetails(response);
  };

  const handleClick = () => {
    setCurrentChat(conversation);
    history(`/message/${conversation._id}`);
  };

  useEffect(() => {
    temp();
  }, [conversation]);

  return (
    <div className="connection" onClick={handleClick}>
      <img
        src="https://media.istockphoto.com/photos/tiger-picture-id1324300536"
        alt="image"
      />

      <h2>{userDetails[0]?.name}</h2>
    </div>
  );
};

export default Connections;
