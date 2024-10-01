const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_PUBLIC_URL,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

// Optional: Test the connection
pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error', err.stack));

module.exports = {
    query: (text, params) => pool.query(text, params),
};