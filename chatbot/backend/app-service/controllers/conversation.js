const { where } = require("sequelize")
const Conversation = require("../models/conversation")
const Message = require("../models/message")
const { text } = require("express")

exports.createConversation = async (req, res, next) => {
  try {
    const { name } = req.body
    const newConv = await Conversation.create({
      name: name,
      userId: req.userToken.userId,
    })

    return res.status(201).json({
      message: "New conversation created successfully!",
      conversation: newConv,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error creating conversation",
    })
  }
}

exports.saveConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params
    const { messages } = req.body

    const newMessages = await Promise.all(
      messages.map(async (message) => {
        if (!message.id) {
          const newMessage = await Message.create({
            text: message.text,
            conversationId: conversationId,
          })
          return newMessage
        }
        return message
      })
    )

    return res.status(200).json({
      message: "Conversation saved successfully!",
      newMessages: newMessages,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error saving conversation",
    })
  }
}

exports.loadConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params
    const messages = await Message.findAll({
      where: { conversationId: conversationId },
    })
    return res.status(200).json({
      message: "Conversation gathered successfully!",
      conversation: messages,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: "Conversation not found, check the id please!",
    })
  }
}

exports.loadUserConversations = async (req, res, next) => {
  try {
    const { userId } = req.userToken
    const conversations = await Conversation.findAll({
      where: { userId: userId },
    })
    return res.status(200).json({
      message: "Conversation gathered successfully!",
      conversations: conversations,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: "User not found, check the id please!",
    })
  }
}

exports.deleteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params
    const conversation = await Conversation.findByPk(conversationId)
    if (conversation.userId !== req.userToken.userId) {
      throw ((message, status) => {
        const error = new Error(message)
        error.status = status
        return error
      })("You don't have permission to delete this conversation!", 403)
    }
    await Conversation.destroy({
      where: { id: conversationId },
    })
    return res.status(200).json({
      message: "Conversation deleted successfully!",
    })
  } catch (error) {
    console.log(error)
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
      })
    } else {
      return res.status(404).json({
        message: "Conversation not found, check the id please!",
      })
    }
  }
}
