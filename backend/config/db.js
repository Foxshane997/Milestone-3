const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_PUBLIC_URL,
    // Disable SSL if your database server does not support it
    ssl: process.env.DATABASE_USE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Optional: Test the connection
pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error', err.stack));

module.exports = {
    query: (text, params) => pool.query(text, params),
};
