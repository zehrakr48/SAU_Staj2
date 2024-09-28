const jwt = require("jsonwebtoken")
const csurf = require("csurf")
//Gonna use csrf token for authorization

exports.decodeToken = (req, res, next) => {
  const authHeader = req.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      "errorMessage": "Authorization header missing or malformed!",
    })
  }

  const token = req.get("Authorization").split(" ")[1]
  try {
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
    req.userToken = decodedToken
    next()
  } catch (err) {
    return res.status(400).json({
      "errorMessage": "Invalid token!",
    })
  }
}

exports.checkAuthorization = csurf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
})
