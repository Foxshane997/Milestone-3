const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jwt

// Login User function
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne(username);
        console.log('User found:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Generated Token:", token)
        console.log("Logged in User Data:", { id: user.id, username: user.username, admin: user.admin })

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };
