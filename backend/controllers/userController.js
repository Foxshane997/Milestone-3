const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { username, password, admin } = req.body;
    try {
        const newUser = await User.createUser(username, password, admin);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createUser, getAllUsers };
