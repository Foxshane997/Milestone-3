const Song = require('../models/songQueue');

const addSong = async (req, res) => {
    console.log('Incoming request body:', req.body);
    const { username, name } = req.body;
    try {
        const newSong = await Song.createSong({ username, name });
        res.status(201).json(newSong);
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get all songs
const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.getAllSongs();
        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to clear all songs in the queue
const clearQueue = async (req, res) => {
    try {
        await Song.clearAllSongs(); // Call to model method to clear songs
        res.status(204).send(); // Send a no content response
    } catch (error) {
        console.error('Error clearing song queue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addSong, getAllSongs, clearQueue };
