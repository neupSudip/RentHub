const Message = require("../models/message");

module.exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const response = await newMessage.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
