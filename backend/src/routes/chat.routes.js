const express = require("express");
const { protect } = require("../middlewares/auth");
const { getConversations, getMessages, sendMessage } = require("../controllers/chat.controller");

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all conversations for logged-in user
router.get("/conversations", getConversations);

// Get messages in a conversation
router.get("/messages/:conversationId", getMessages);

// Send a message
router.post("/send", sendMessage);

module.exports = router;
