const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_PUBLIC_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Optional: Test the connection
pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error', err.stack));

module.exports = {
    query: (text, params) => pool.query(text, params),
};
