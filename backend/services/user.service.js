const User = require('../models').User

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// User register
exports.create = async data => {
  data.password = await bcrypt.hash(data.password, 10)
  return User.create(data)
}

// User login
exports.authenticate = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } })
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id }, config.development.secret, {expiresIn: config.development.expiresIn})
    return {
      ...user.toJSON(),
      token
    }
  }
}

// Get all users
exports.getAll = async () => {
  return await User.findAll()
}

// Get user by ID
exports.getById = async id => {
  return await User.findByPk(id)
}

// Update user
exports.update = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10)
  }
  return await User.update(data, { where: { id: id } })
}

// Delete user
exports.delete = async id => {
  return await User.destroy({ where: { id: id } })
}
