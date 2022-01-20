const express = require("express");

const {
  getPosts,
  getPost,
  getUserPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  postComment,
  deletePost,
} = require("../controllers/post");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getPosts);

router.get("/search", auth, getPostsBySearch);

router.get("/:id", auth, getPost);

router.get("/user/:id", auth, getUserPosts);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.post("/:id/comment", auth, postComment);

router.delete("/:id", auth, deletePost);

module.exports = router;
