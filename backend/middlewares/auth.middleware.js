const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('../config/config')
const User  = require('../models').User

/**
 * Authentication middleware
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {any}
 */
function authenticate(req, res, next) {
  const { username, password } = req.body;
  User.findOne({ where: { username } })
    .then((authUser) => {
      if (authUser && bcrypt.compareSync(password, authUser.password)) {
        req.user = authUser.toJSON();
        req.token = generateAccessToken(req.user);
        req.refreshToken = generateRefreshToken(req.user);
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch(next);
}

/**
 * Authorization middleware
 * @returns {any}
 */
function authorize(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, config.development.secret);
    if (req.path === '/users/:id') {
      req.user = decoded;
      next();
    } else {
      return res.status(401).send('Access denied. Route secured.');
    }
  } catch (ex) {
    if (ex.name === 'TokenExpiredError') {
      // The token has expired, so issue a new one
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).send('Refresh token not found.');
      }
      try {
        const decodedRefreshToken = jwt.verify(refreshToken, config.development.secret);
        const user = decodedRefreshToken.user;
        const newAccessToken = generateAccessToken(user);
        res.cookie('refreshToken', generateRefreshToken(user));
        res.json({ accessToken: newAccessToken });
      } catch (ex) {
        return res.status(401).send('Invalid refresh token.');
      }
    } else {
      return res.status(401).send('JWT Error: invalid token');
    }
  }
}

/**
 * Generate access tokens
 * @param {any} user
 * @returns {any}
 */
function generateAccessToken (user) {
  return jwt.sign(
    user,
    config.development.secret,
    { expiresIn: '15m' }
  )
}

/**
 * Generate refresh tokens
 * @param {any} user
 * @returns {any}
 */
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

module.exports = { authenticate, authorize, generateAccessToken, generateRefreshToken };
