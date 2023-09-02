const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { authorize } = require('../middlewares/auth.middleware')
const config = require('../config/config')
const staff = require('../models').Staff


// Get all staff profiles
router.get('/staffs', authorize, (req, res, next) => {
  staff.findAll()
    .then(staffs => {
      if (staffs.length === 0) {
        return res.status(404).send('No staff found.')
      }
      res.json(staffs)
    })
    .catch(next)
})

// Get a single staff profile
router.get('/staffs/:id', authorize, (req, res, next) => {
  const { id } = req.params
  staff.findByPk(id)
    .then(staff => {
      if (staff) {
        res.json(staff)
      } else {
        res.status(404).send('staff Not Found.')
      }
    })
    .catch(next)
})

// Create a new staff profile
router.post('/staffs', authorize, (req, res, next) => {
  const { user_id } = req.body
  staff.create({ user_id })
    .then(() => {
      res.status(201).send('staff Profile Created Successfully.')
    })
    .catch(next)
})

// Update a staff profile
router.put('/staffs/:id', authorize, (req, res, next) => {
  const { id } = req.params
  const { position, departement, isActive } = req.body
  const data = {}
  if (position) data.position = position
  if (departement) data.departement = departement
  if (typeof isActive !== 'undefined') data.isActive = isActive

  staff.update(data, { where: { user_id: id } })
    .then(() => {
      res.status(204).send('staff Profile Updated Successfully.')
    })
    .catch(next)
})

// Delete a staff profile
router.delete('/staffs/:id', authorize, (req, res, next) => {
  const { id } = req.params
  staff.destroy({ where: { user_id: id } })
    .then(() => {
      res.json({ message: 'staff Profile Deleted Successfully.' })
    })
    .catch(next)
})

module.exports = router
