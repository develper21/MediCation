const prisma = require("../config/prisma");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// Get all conversations for a user
const getConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { patientId: userId },
          { caregiverId: userId }
        ]
      },
      include: {
        patient: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        caregiver: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const formattedConversations = conversations.map(conv => {
      const otherUser = userId === conv.patientId ? conv.caregiver : conv.patient;
      return {
        id: conv.id,
        patientId: conv.patientId,
        caregiverId: conv.caregiverId,
        otherUser: {
          id: otherUser.id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          email: otherUser.email
        },
        lastMessage: conv.messages[0] || null,
        createdAt: conv.createdAt
      };
    });

    sendSuccess(res, { conversations: formattedConversations }, "Conversations fetched");
  } catch (error) {
    next(error);
  }
};

// Get messages for a conversation
const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Verify user is part of conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { patientId: userId },
          { caregiverId: userId }
        ]
      }
    });

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: {
        conversation: true
      }
    });

    sendSuccess(res, { messages }, "Messages fetched");
  } catch (error) {
    next(error);
  }
};

// Send a message
const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, text } = req.body;
    const userId = req.user.id;

    if (!text || text.trim() === "") {
      throw new AppError("Message cannot be empty", 400);
    }

    // Verify user is part of conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          { patientId: userId },
          { caregiverId: userId }
        ]
      }
    });

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        text
      }
    });

    sendSuccess(res, { message }, "Message sent", 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getMessages,
  sendMessage
};
