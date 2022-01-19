const mongoose = require("mongoose");
const Post = require("../models/post");

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
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
    return res.satus(404).send("No Such Post Found !");

  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.satus(404).send("No Such Post Found !");

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post has been deleted successfully" });
};
