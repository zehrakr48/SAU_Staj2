const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { where } = require("sequelize")

createToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET
  const jwtData = {
    userId: user.id,
    email: user.email,
    username: user.username,
    userRole: user.role,
  }
  return jwt.sign(jwtData, jwtSecret, { expiresIn: "30m" })
}

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUserObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role || "user",
    }
    const newUser = User.create({ ...newUserObj })
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register new user",
    })
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Internal server error" })
      }

      if (!result) {
        return res
          .status(400)
          .json({ errorMessage: "Invalid email and password" })
      } else {
        if (err) {
          return res.status(500).json({ errorMessage: "Session save error" })
        }
        const token = createToken(user)
        if (!token) {
          return res.status(500).json({ errorMessage: "Internal server error" })
        }

        req.session.userId = user.username

        res.cookie("userToken", token, {
          maxAge: 30 * 60 * 1000,
          secure: true,
          path: "/",
          sameSite: "None",
        })

        return res.status(200).json({
          message: "User logged in successfully",
        })
      }
    })
  } catch (error) {
    return res.status(400).json({ errorMessage: "User doesn't exist" })
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll()
    return res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to gather users",
    })
  }
}

exports.letGuestUser = async (req, res, next) => {
  const rndInt = Math.floor(Math.random() * Math.pow(2, 24)) + 1
  req.session.userId = "guest" + rndInt
  return res.status(200).json({
    message: "Guest user landed!",
  })
}

exports.grantAuthRights = async (req, res, next) => {
  try {
    if (req.userToken.userRole === "admin") {
      res.cookie("XSRF-TOKEN", req.csrfToken(), {
        httpOnly: false,
        secure: true,
        path: "/",
        sameSite: "None",
      })
    }
    return res.status(200).json({
      message: "User rights granted!",
    })
  } catch (error) {
    console.log(error)
  }
}
