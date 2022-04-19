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
  getSavedPosts,
  savePost,
  removePost,
} = require("../controllers/post");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/:type", auth, getPosts);

router.get("/search/:userType/api", auth, getPostsBySearch);

router.get("/post/:id", auth, getPost);

router.get("/user/:id", auth, getUserPosts);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.post("/:id/comment", auth, postComment);

router.delete("/:id", auth, deletePost);

router.get("/savedposts/:userId", auth, getSavedPosts);

router.post("/savepost/:userId/:postId", auth, savePost);

router.delete("/remove/:userId/:postId", auth, removePost);

module.exports = router;
