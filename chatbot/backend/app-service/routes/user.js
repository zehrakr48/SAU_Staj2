const Router = require("express").Router()

const middlewareController = require("../controllers/middleware")

const userController = require("../controllers/user")

Router.post("/account", userController.createUser)

Router.get("/account", userController.getUsers)

Router.post("/account/login", userController.loginUser)

Router.get(
  "/account/admin",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  userController.grantAuthRights
)

Router.post("/account/guest", userController.letGuestUser)

module.exports = Router
