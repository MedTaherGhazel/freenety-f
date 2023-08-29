const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { authenticate, authorize } = require('../middlewares/auth.middleware');
const config = require('../config/config');
const User = require('../models').User;

// User routes
router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        username,
        email,
        password: hash
      });
    })
    .then(() => {
      res.json({ message: 'Registration successful' });
    })
    .catch(next);
});

router.post('/login', authenticate, (req, res) => {
  res.json({ ...req.user, token: req.token });
});

router.get('/users', (req, res, next) => {
  User.findAll({
    attributes: ['username', 'email', 'createdAt']
  })
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

router.get('/users/:id', (req, res, next) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

router.put('/users/:id', authorize, (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const data = {};
  if (username) data.username = username;
  if (email) data.email = email;
  if (password) data.password = bcrypt.hashSync(password, 10);
  User.update(data, { where: { id } })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

router.delete('/users/:id', authorize, (req, res, next) => {
  const { id } = req.params;
  User.destroy({ where: { id } })
    .then(() => {
      res.json({ message: 'User deleted successfully' });
    })
    .catch(next);
});

module.exports = router;
