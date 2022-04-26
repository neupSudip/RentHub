const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  savedPost: {
    type: [String],
  },
  bookedPosts: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
