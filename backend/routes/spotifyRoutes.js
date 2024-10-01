const express = require('express');
const { getSpotifyAuth, handleSpotifyCallback } = require('../controllers/spotifyController');
const router = express.Router();

router.get('/login', getSpotifyAuth);
router.get('/callback', handleSpotifyCallback);

module.exports = router;
