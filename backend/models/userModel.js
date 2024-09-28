const db = require('../config/db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = {
    // Create a new user with a hashed password
    createUser: async (username, password, admin = false) => {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const query = 'INSERT INTO users (username, password, admin) VALUES ($1, $2, $3) RETURNING *';
            const result = await db.query(query, [username, hashedPassword, admin]);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    // Retrieve all users from the database
    getAllUsers: async () => {
        const query = 'SELECT * FROM users';
        const result = await db.query(query);
        return result.rows;
    },

    // Find a user by username
    findOne: async (username) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(query, [username]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    },
};

module.exports = User;
