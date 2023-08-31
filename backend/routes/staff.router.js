const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { authorize } = require('../middlewares/auth.middleware')
const config = require('../config/config')
const StaffProfile = require('../models').StaffProfile


// Get all staff profiles
router.get('/staffs', authorize, (req, res, next) => {
  StaffProfile.findAll()
    .then(staffs => {
      res.json(staffs)
    })
    .catch(next)
})

// Get a single staff profile
router.get('/staffs/:id', authorize, (req, res, next) => {
  const { id } = req.params
  StaffProfile.findByPk(id)
    .then(staff => {
      if (staff) {
        res.json(staff)
      } else {
        res.status(404).send('Staff Not Found.')
      }
    })
    .catch(next)
})

// Create a new staff profile
router.post('/staffs', authorize, (req, res, next) => {
  const { position, departement, isActive, user_id } = req.body
  StaffProfile.create({
    position,
    departement,
    isActive,
    user_id
  })
    .then(() => {
      res.status(201).send('Staff Profile Created Successfully.')
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

  StaffProfile.update(data, { where: { id } })
    .then(() => {
      res.status(204).send('Staff Profile Updated Successfully.')
    })
    .catch(next)
})

// Delete a staff profile
router.delete('/staffs/:id', authorize, (req, res, next) => {
  const { id } = req.params
  StaffProfile.destroy({ where: { id } })
    .then(() => {
      res.json({ message: 'Staff Profile Deleted Successfully.' })
    })
    .catch(next)
})

module.exports = router
