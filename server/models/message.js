const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    require: true,
  },
  senderId: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
