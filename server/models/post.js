const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  creatorName: String,
  creatorId: String,
  creatorType: String,
  status: {
    type: Boolean,
    default: true,
  },
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
  coords: String,
  negotiable: String,
  image: String,
  image2: String,
  discription: {
    type: String,
    trim: true,
  },
  people: Number,
  comments: { type: [String], default: [] },
  booked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
