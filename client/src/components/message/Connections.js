import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../actions/auth";
import "./connections.css";

const Connections = ({ conversation, setCurrentChat, setFriend, userId }) => {
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
    setFriend(userDetails[0]?.name);
    history(`/message/${conversation._id}`);
  };

  useEffect(() => {
    temp();
  }, [conversation]);

  return (
    <div className="connection" onClick={handleClick}>
      <img src={userDetails[0]?.image} alt={userDetails[0]?.name.charAt(0)} />

      <h2>{userDetails[0]?.name}</h2>
    </div>
  );
};

export default Connections;
