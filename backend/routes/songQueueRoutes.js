const express = require('express');
const { addSong, getAllSongs, clearQueue } = require('../controllers/songQueueController');

const router = express.Router();

router.post('/add', addSong);

router.get('/', getAllSongs);

router.delete('/clear', clearQueue);

module.exports = router;
