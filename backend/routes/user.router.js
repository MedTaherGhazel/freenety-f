const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', authenticate, userController.update);
router.delete('/users/:id', authenticate, userController.delete);

module.exports = router;
