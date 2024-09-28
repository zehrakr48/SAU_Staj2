const Router = require("express").Router()

const middlewareController = require("../controllers/middleware")

const promptController = require("../controllers/prompt")

Router.get("/prompt", promptController.getPrompts)

Router.post(
  "/prompt",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  promptController.createPrompt
)

Router.put(
  "/prompt/:id",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  promptController.updatePrompt
)

Router.delete(
  "/prompt/:id",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  promptController.deletePrompt
)

Router.delete(
  "/prompt",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  promptController.deletePrompts
)

module.exports = Router
