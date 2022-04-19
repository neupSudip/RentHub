const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      creatorType: { $ne: req.params.type },
    }).sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creatorId: id }).sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById({ _id: id });
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getPostsBySearch = async (req, res) => {
  const { location, title, tags } = req.query;

  try {
    const location1 = new RegExp(location, "i");
    const title1 = new RegExp(title, "i");
    const posts = await Post.find({
      creatorType: { $ne: req.params.userType },
      $or: [
        { location: location1 },
        { title: title1 },
        { tags: { $in: tags.split(",") } },
      ],
    }).sort({ _id: -1 });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post({
    ...post,
    creatorId: req.userId,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.satus(404).send("Can not found the post !");

  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

module.exports.postComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const post = await Post.findById(id);
    post.comments.push(comment);
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {}
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.satus(404).send("Can not found the post !");
  await Post.findByIdAndRemove(id);

  res.json({ message: "Post has been deleted successfully" });
};

module.exports.getSavedPosts = async (req, res) => {
  try {
    const posts = await User.find(
      { _id: req.params.userId },
      { _id: 0, savedPost: 1 }
    );
    let savedPosts = [];

    for (const id of posts[0].savedPost) {
      const post = await Post.findById(id);
      savedPosts.push(post);
    }

    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.savePost = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const savedPosts = await User.find(
      { _id: userId },
      { _id: 0, savedPost: 1 }
    );

    let temp = true;
    savedPosts[0].savedPost.forEach(function (id) {
      if (postId === id) {
        temp = false;
      }
    });

    if (temp) {
      const updatedUser = await User.updateOne(
        { _id: userId },
        { $push: { savedPost: postId } }
      );

      res.json(updatedUser.savedPost);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.removePost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    await User.updateMany({ _id: userId }, { $pull: { savedPost: postId } });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
