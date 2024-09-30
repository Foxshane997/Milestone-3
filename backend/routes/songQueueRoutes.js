const express = require('express');
const { addSong, getAllSongs, clearQueue } = require('../controllers/songQueueController');

const router = express.Router();

// Route to add a new song
router.post('/add', addSong);

// Route to get all songs
router.get('/', getAllSongs);

// Route to clear the entire song queue
router.delete('/clear', clearQueue);

module.exports = router;
