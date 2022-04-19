const Conversation = require("../models/conversation");

module.exports.getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    }).sort({ modifiedAt: 1 });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createConversation = async (req, res) => {
  const conversation = await Conversation.find({
    $and: [{ members: req.body[0] }, { members: req.body[1] }],
  });

  console.log(conversation);

  if (conversation.length === 0) {
    console.log("check");
    const newConversation = new Conversation({
      members: req.body,
    });
    try {
      await newConversation.save();
      res.status(201).json(newConversation);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else {
    res.status(201).json(conversation);
  }
};
