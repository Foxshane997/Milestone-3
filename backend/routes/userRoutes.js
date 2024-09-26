const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const { loginUser } = require('../controllers/loginPage'); // Import the login controller

const router = express.Router();

// Define routes
router.post('/', createUser); 
router.get('/', getAllUsers);
router.post('/login', loginUser); // Use the loginUser controller for the login route

module.exports = router;
