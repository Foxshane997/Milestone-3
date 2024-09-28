const Song = require('../models/songQueue');

const addSong = async (req, res) => {
    console.log('Incoming request body:', req.body); // Add this line to see the incoming data
    const { username, name } = req.body; // Accepting username and name from request body
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

module.exports = { addSong, getAllSongs };
