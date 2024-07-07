const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/jwt.config')

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Unauthorized. Token not provided or invalid format.' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, secretKey)
    req.userId = decodedToken.userId
    next()
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' })
  }
}

module.exports = { authenticateToken }
