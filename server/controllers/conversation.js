const mongoose = require("mongoose");
const Conversation = require("../models/conversation");

module.exports.getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
