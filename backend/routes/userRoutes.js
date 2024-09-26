const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
router.post('/register', createUser); 

// Route to get all users
router.get('/', getAllUsers);

module.exports = router;
