const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('../config/config')
const User  = require('../models').User



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
        res.status(404).send('User Not Found.');
      }
    })
    .catch(next);
}

function authorize(req, res, next) {
  const token = req.header('Authorization');
  console.log(' === >>> authorization requested');
  if (!token) return res.status(403).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, config.development.secret);
    console.log(' === >>> Token verified');
    req.user = decoded;
    next();
  } catch (ex) {
    if (ex.name === 'TokenExpiredError') {
      // The token has expired, so issue a new one
      console.log(' === >>> Token Expired');
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        console.log(' === >>> Refresh Token Not Found');
        return res.status(404).send('Refresh token not found.');
      }
      try {
        const decodedRefreshToken = jwt.verify(refreshToken, config.development.secret);
        const user = decodedRefreshToken.user;
        const newAccessToken = generateAccessToken(user);
        res.cookie('refreshToken', generateRefreshToken(user));
        res.json({ accessToken: newAccessToken });
      } catch (ex) {
        console.log(' === >>> Invalid Refresh Token');
        return res.status(401).send('Invalid refresh token.');
      }
    } else {
      console.log(' === >>> Invalid Access Token');
      return res.status(403).send('JWT Error: invalid token');
    }
  }
}

function generateAccessToken (user) {
  console.log(' === >>> we generated access token');
  return jwt.sign(
    user,
    config.development.secret,
    { expiresIn: config.development.expiresIn }
  )
}


let refreshTokens = []
function generateRefreshToken (user) {
  const refreshToken = jwt.sign(
    user,
    config.development.secret,
    { expiresIn: config.development.expiresIn }
  )
  refreshTokens.push(refreshToken)
  console.log(' === >>> we generated refresh token');
  return refreshToken
}

module.exports = { authenticate, authorize, generateAccessToken, generateRefreshToken };
