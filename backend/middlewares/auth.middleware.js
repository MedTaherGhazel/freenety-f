const jwt = require('jsonwebtoken')
const config = require('../config/config')

// Authentication middleware
function authenticate () {
  return (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
      const decoded = jwt.verify(token, config.development.secret);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(401).send('JWT Error: invalid token');
    }
  };
}

// accessTokens
function generateAccessToken (user) {
  return jwt.sign(
    user,
    config.development.secret,
    { expiresIn: '15m' }
  )
}

// refreshTokens
let refreshTokens = []
function generateRefreshToken (user) {
  const refreshToken = jwt.sign(
    user,
    config.development.secret,
    { expiresIn: '20m' }
  )
  refreshTokens.push(refreshToken)
  return refreshToken
}

module.exports = { authenticate, generateAccessToken, generateRefreshToken };
