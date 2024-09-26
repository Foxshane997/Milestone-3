const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Login User function
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
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
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };
