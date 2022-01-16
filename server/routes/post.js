const express = require("express");

const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPosts);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;
