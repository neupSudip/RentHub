const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  members: {
    type: Array,
    require: true,
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
