const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  creatorName: String,
  creatorId: String,
  creatorType: String,
  title: String,
  amount: Number,
  tags: [String],
  location: String,
  negotiable: String,
  image: String,
  discription: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
