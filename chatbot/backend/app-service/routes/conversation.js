const Router = require("express").Router()

const middlewareController = require("../controllers/middleware")

const conversationController = require("../controllers/conversation")

Router.get(
  "/account/conversation",
  middlewareController.decodeToken,
  conversationController.loadUserConversations
)

Router.get(
  "/conversation/:conversationId",
  middlewareController.decodeToken,
  conversationController.loadConversation
)

Router.post(
  "/conversation",
  middlewareController.decodeToken,
  conversationController.createConversation
)

Router.put(
  "/conversation/:conversationId",
  middlewareController.decodeToken,
  conversationController.saveConversation
)

Router.delete(
  "/conversation/:conversationId",
  middlewareController.decodeToken,
  conversationController.deleteConversation
)

module.exports = Router
