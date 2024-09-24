const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

// Define routes
router.post('/', createUser); 
router.get('/', getAllUsers);

module.exports = router;
