const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Login User function
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Use the new findOne method to find the user by username
        const user = await User.findOne(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Optionally return user data or a token
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);  // Log the actual error
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };