const express = require('express');
const { searchSong, getTrackById } = require('../services/spotifyService');

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

router.get('/track/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const trackDetails = await getTrackById(id);
        res.status(200).json(trackDetails);
    } catch (error) {
        console.error('Error fetching track details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
