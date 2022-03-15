const express = require("express");

const {
  getConversations,
  createConversation,
} = require("../controllers/conversation");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/:userId", auth, getConversations);

router.post("/", auth, createConversation);

module.exports = router;
