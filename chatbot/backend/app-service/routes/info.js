const Router = require("express").Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const middlewareController = require("../controllers/middleware")

const infoController = require("../controllers/info")

Router.get(
  "/info",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  infoController.getInfos
)

Router.post(
  "/info",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  infoController.createInfo
)

Router.put(
  "/info/:id",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  infoController.updateInfo
)

Router.delete(
  "/info/:id",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  infoController.deleteInfo
)

Router.post(
  "/file/pdf",
  middlewareController.checkAuthorization,
  middlewareController.decodeToken,
  upload.single("file"),
  infoController.extractPDF
)

module.exports = Router
