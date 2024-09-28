const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const songQueueRoutes = require('./routes/songQueueRoutes');
const songRoutes = require('./routes/songRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(bodyParser.json()); 

// Use user routes
app.use('/api/users', userRoutes);

// Use song queue routes
app.use('/api/songQueue', songQueueRoutes);

// Use main branch song routes
app.use('/api/songs', songRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
