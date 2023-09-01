const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const express = require('express')
const router = express.Router()

const { authenticate, authorize } = require('../middlewares/auth.middleware')
const config = require('../config/config')
const User = require('../models').User

axios.defaults.baseURL = `http://${config.development.host}:${config.development.port}`

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
      axios
        .post('/api/login', {
          username: user.username,
          password: req.body.password
        })
        .then(response => {
          const token = response.data.token
          const parsedRole = user.role.roles[1]
          let profileCreationRoute
          console.log(' === >>> login successful, parsing role.')

          switch (parsedRole) {
            case 'STAFF':
              profileCreationRoute = '/api/staffs'
              console.log(' === >>> STAFF detected. sending request.')
              break
            case 'CLIENT':
              profileCreationRoute = '/api/clients'
              console.log(' === >>> CLIENT detected. sending request.')
              break
            case 'TALENT':
              profileCreationRoute = '/api/talents'
              console.log(' === >>> TALENT detected. sending request.')
              break
            default:
              return res.status(400).send('Invalid role.')
          }

          axios
            .post(
              profileCreationRoute,
              {
                user_id: user.id
              },
              {
                headers: {
                  Authorization: `${token}`
                }
              }
            )
            .then(() => {
              res
                .status(201)
                .send('Registration and profile creation successful.')
            })
            .catch(next)
        })
        .catch(next)
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        const message =
          err.errors[0].path == 'username'
            ? 'Username already exists.'
            : 'Email already exists.'
        res.status(406).send(message)
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
