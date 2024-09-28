const express = require('express');
const { addSong, getAllSongs } = require('../controllers/songQueueController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route to add a new song
router.post('/add', addSong);

// Route to get all songs
router.get('/', getAllSongs);

module.exports = router;
