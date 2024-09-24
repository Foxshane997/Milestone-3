const db = require('../config/db');

const User = {
    createUser: async (username, password, admin = false) => {
        const query = 'INSERT INTO users (username, password, admin) VALUES ($1, $2, $3) RETURNING *';
        const result = await db.query(query, [username, password, admin]);
        return result.rows[0];
    },

    getAllUsers: async () => {
        const query = 'SELECT * FROM users';
        const result = await db.query(query);
        return result.rows;
    },
};

module.exports = User;
