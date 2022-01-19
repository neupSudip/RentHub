const express = require("express");

const {
  getPosts,
  getPost,
  getUserPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPosts);

router.get("/search", getPostsBySearch);

router.get("/:id", getPost);

router.get("/user/:id", getUserPosts);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;
