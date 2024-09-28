const express = require("express")
const app = express()

const { sequelize, syncDatabase } = require("./util/database")

const cors = require("cors")
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
)

const session = require("express-session")

app.use(
  session({
    name: "sessionToken",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: false, maxAge: 1000 * 60 * 30 },
  })
)

require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cookieParser = require("cookie-parser")
app.use(cookieParser())

const promptRouter = require("./routes/prompt")
const userRouter = require("./routes/user")
const infoRouter = require("./routes/info")
const conversationRouter = require("./routes/conversation")

app.use(promptRouter)
app.use(userRouter)
app.use(infoRouter)
app.use(conversationRouter)

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
    return syncDatabase()
  })
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on " + process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
