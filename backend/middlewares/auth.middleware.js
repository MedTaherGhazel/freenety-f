const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = function (req, res, next) {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  try {
    const decoded = jwt.verify(token, config.development.secret)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('JWT Error: invalid token')
  }
}
