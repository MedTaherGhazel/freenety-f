const userService = require('../services/user.service');

// User controller functions go here

// User registration
exports.register = (req, res, next) => {
  userService.create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

// User login
exports.login = (req, res, next) => {
  userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next);
}

// Get all users
exports.getAll = (req, res, next) => {
  userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

// Get user by ID
exports.getById = (req, res, next) => {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(next);
}

// Update user
exports.update = (req, res, next) => {
  userService.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next);
}

// Delete user
exports.delete = (req, res, next) => {
  userService.delete(req.params.id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(next);
}
