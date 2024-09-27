const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Login User function
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne(username);
        console.log('User found:', user);  // Add this to see if the user is retrieved
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);  // Log the actual error
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };