// backend/routes/songRoutes.js
const express = require('express');
const { searchSong } = require('../services/spotifyService');

const router = express.Router();

router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await searchSong(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching for song:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
