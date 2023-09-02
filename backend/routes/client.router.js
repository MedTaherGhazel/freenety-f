const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { authorize } = require('../middlewares/auth.middleware')
const config = require('../config/config')
const client = require('../models').Client


// Get all client profiles
router.get('/clients', authorize, (req, res, next) => {
  client.findAll()
    .then(clients => {
      if (clients.length === 0) {
        return res.status(404).send('No client found.')
      }
      res.json(clients)
    })
    .catch(next)
})

// Get a single client profile
router.get('/clients/:id', authorize, (req, res, next) => {
  const { id } = req.params
  client.findByUserId(id)
    .then(client => {
      if (client) {
        res.json(client)
      } else {
        res.status(404).send('client Not Found.')
      }
    })
    .catch(next)
})

// Create a new client profile
router.post('/clients', authorize, (req, res, next) => {
  const { user_id } = req.body
  client.create({ user_id })
    .then(() => {
      res.status(201).send('client Profile Created Successfully.')
    })
    .catch(next)
})

// Update a client profile
router.put('/clients/:id', authorize, (req, res, next) => {
  const { id } = req.params
  const { company_name, client_data, membership_type, isActive } = req.body
  const data = {}
  if (company_name) data.company_name = company_name
  if (company_addr) data.company_addr = company_addr
  if (client_data) data.client_data = client_data
  if (membership_type) data.membership_type = membership_type

  client.update(data, { where: { user_id: id } })
    .then(() => {
      res.status(204).send('client Profile Updated Successfully.')
    })
    .catch(next)
})

// Delete a client profile
router.delete('/clients/:id', authorize, (req, res, next) => {
  const { id } = req.params
  client.destroy({ where: { user_id: id } })
    .then(() => {
      res.json({ message: 'client Profile Deleted Successfully.' })
    })
    .catch(next)
})

module.exports = router
