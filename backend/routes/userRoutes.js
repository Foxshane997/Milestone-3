const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');

const { loginUser } = require('../controllers/loginPage'); // Import the login controller



const router = express.Router();

// Route to register a new user
router.post('/register', createUser); 

// Route to get all users
router.get('/', getAllUsers);
router.post('/login', loginUser); // Use the loginUser controller for the login route

module.exports = router;
