const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const express = require('express')
const router = express.Router()

const { authenticate, authorize } = require('../middlewares/auth.middleware')
const config = require('../config/config')
const User = require('../models').User
const staff = require('../models').Staff
const client = require('../models').Client
const talent = require('../models').Talent

// User routes
router.post('/register', (req, res, next) => {
  const { username, email, password, role } = req.body

  bcrypt
    .hash(password, 10)
    .then(hash => {
      console.log(' === >>> creating user.')
      return User.create({
        username,
        email,
        password: hash,
        role
      })
    })
    .then(user => {
      console.log(' === >>> logging in.')

      // Call the authenticate middleware directly
      authenticate(req, res, () => {
        const token = req.token
        const parsedRole = user.role.roles[1]
        req.headers = { Authorization: `${token}` }

        console.log(' === >>> login successful, parsing role.')
        switch (parsedRole) {
          case 'STAFF':
            console.log(' === >>> STAFF detected. sending request.')
            staff
              .create({ user_id: user.id })
              .then(() => {
                res.status(201).send('Staff Profile Created Successfully.')
            })
            break
          case 'CLIENT':
            console.log(' === >>> CLIENT detected. sending request.')
            client
              .create({ user_id: user.id })
              .then(() => {
                res.status(201).send('Client Profile Created Successfully.')
              })
              .catch(next)
            break
          case 'TALENT':
            console.log(' === >>> TALENT detected. sending request.')
            talent
              .create({ user_id: user.id })
              .then(() => {
                res.status(201).send('Talent Profile Created Successfully.')
              })
              .catch(next)
            break
          default:
            return res.status(400).send('Invalid role.')
        }
      })
    })
    .catch(err => {
      console.error(' == ++++ >>> ', err);
      if (err instanceof Sequelize.UniqueConstraintError) {
        const message =
          err.errors[0].path == 'username'
            ? 'Username already exists.'
            : 'Email already exists.'
        res.status(406).send(message)
      } else if (err instanceof Sequelize.DatabaseError) {
        console.error('Database error');
        res.status(500).send('Database error')
      } else if (err instanceof Sequelize.ConnectionError) {
        console.error('Database connection error');
        res.status(500).send('Database connection error')
      } else {
        next(err)
      }
    })
})

router.post('/login', authenticate, (req, res) => {
  res.json({ ...req.user, token: req.token })
})

router.get('/users', (req, res, next) => {
  User.findAll({
    attributes: ['username', 'email', 'createdAt']
  })
    .then(users => {
      res.json(users)
    })
    .catch(next)
})

router.get('/users/:id', (req, res, next) => {
  const { id } = req.params
  User.findByPk(id)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).send('User Not Found.')
      }
    })
    .catch(next)
})

router.put('/users/:id', authorize, (req, res, next) => {
  console.log(` === >>> user authorized ${JSON.stringify(req.user)}`)

  const { id } = req.params
  const { username, email, password } = req.body
  const data = {}
  if (username) data.username = username
  if (email) data.email = email
  if (password) data.password = bcrypt.hashSync(password, 10)

  // Get the id of the authorized user
  const userId = req.user.id
  User.update(data, { where: { id: userId } })
    .then(() => {
      User.findByPk(userId)
        .then(user => user.save())
        .then(() => {
          res.status(204).send('User Update Successfully.')
        })
        .catch(next)
    })
    .catch(err => {
      if (err.name === 'NotFoundError') {
        res.status(404).send('User not found.')
      } else {
        next(err)
      }
    })
})

router.delete('/users/:id', authorize, (req, res, next) => {
  const { id } = req.params
  User.destroy({ where: { id } })
    .then(() => {
      res.json({ message: 'User deleted successfully' })
    })
    .catch(next)
})

module.exports = router
