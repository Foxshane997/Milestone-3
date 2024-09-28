const db = require('../config/db');

class Song {
    static async createSong({ username, name }) {
        const timestamp = new Date(); // Get the current timestamp
        try {
            const result = await db.query(
                'INSERT INTO song_queue (username, name, time_submitted) VALUES ($1, $2, $3) RETURNING *',
                [username, name, timestamp]
            );
            return result.rows[0]; // Return the newly created song
        } catch (error) {
            throw new Error('Database Error: ' + error.message);
        }
    }

    static async getAllSongs() {
        try {
            const result = await db.query('SELECT * FROM songs ORDER BY time_submitted DESC');
            return result.rows;
        } catch (error) {
            throw new Error('Database Error: ' + error.message);
        }
    }
}

module.exports = Song;
