const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  creatorName: String,
  creatorId: String,
  creatorType: String,
  title: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    trim: true,
  },
  tags: [String],
  location: {
    type: String,
    trim: true,
  },
  negotiable: String,
  image: String,
  discription: {
    type: String,
    trim: true,
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
