const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyRoutes = require('./routes/spotifyRoutes');
const userRoutes = require('./routes/userRoutes');
const songQueueRoutes = require('./routes/songQueueRoutes');
const songRoutes = require('./routes/songRoutes');
const queueRoutes = require('./routes/songQueueRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(bodyParser.json());

// Routes

// Spotify routes
app.use('/spotify', spotifyRoutes);

// User routes
app.use('/api/users', userRoutes);

// Song queue routes
app.use('/api/songQueue', songQueueRoutes);

// Main song routes
app.use('/api/songs', songRoutes);

// New queue routes
app.use('/api/queue', queueRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

