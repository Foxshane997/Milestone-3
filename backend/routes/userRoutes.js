const express = require('express');

const { createUser, getAllUsers } = require('../controllers/userController');
const { loginUser } = require('../controllers/loginPage');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', createUser); 

router.get('/', auth, getAllUsers);

router.post('/login', loginUser);

module.exports = router;
