const express = require('express')
const router = express.Router()

const { authorize } = require('../middlewares/auth.middleware')
const talent = require('../models').Talent


// Get all talent profiles
router.get('/talents', authorize, (req, res, next) => {
  talent.findAll()
    .then(talents => {
      if (talents.length === 0) {
        return res.status(404).send('No talent found.')
      }
      res.json(talents)
    })
    .catch(next)
})

// Get a single talent profile
router.get('/talents/:id', authorize, (req, res, next) => {
  const { id } = req.params
  talent.findByPk(id)
    .then(talent => {
      if (talent) {
        res.json(talent)
      } else {
        res.status(404).send('talent Not Found.')
      }
    })
    .catch(next)
})

// Create a new talent profile
router.post('/talents', authorize, (req, res, next) => {
  const { user_id } = req.body
  talent.create({ user_id })
    .then(() => {
      res.status(201).send('talent Profile Created Successfully.')
    })
    .catch(next)
})

// Update a talent profile
router.put('/talents/:id', authorize, (req, res, next) => {
  const { id } = req.params
  const { portfolio, talent_data, membership_type, isActive } = req.body
  const data = {}
  if (portfolio) data.portfolio = portfolio
  if (talent_data) data.talent_data = talent_data
  if (membership_type) data.membership_type = membership_type
  if (typeof isActive !== 'undefined') data.isActive = isActive

  talent.update(data, { where: { user_id: id } })
    .then(() => {
      res.status(204).send('talent Profile Updated Successfully.')
    })
    .catch(next)
})

// Delete a talent profile
router.delete('/talents/:id', authorize, (req, res, next) => {
  const { id } = req.params
  talent.destroy({ where: { user_id: id } })
    .then(() => {
      res.json({ message: 'talent Profile Deleted Successfully.' })
    })
    .catch(next)
})

module.exports = router
