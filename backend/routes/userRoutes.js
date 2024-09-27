const express = require('express');

const { createUser, getAllUsers } = require('../controllers/userController');
const { loginUser } = require('../controllers/loginPage');

const router = express.Router();

// Route to Register a new user
router.post('/register', createUser); 

// Route to get all users
router.get('/', getAllUsers);

// Route for logging in
router.post('/login', loginUser);

module.exports = router;
