const express = require("express");

const { getMessages, createMessage } = require("../controllers/message");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getMessages);

router.post("/", auth, createMessage);

module.exports = router;
