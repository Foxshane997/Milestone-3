const db = require('../config/db');

class Song {
    static async createSong({ username, name }) {
        const timestamp = new Date();
        try {
            const result = await db.query(
                'INSERT INTO song_queue (username, name, time_submitted) VALUES ($1, $2, $3) RETURNING *',
                [username, name, timestamp]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Database Error: ' + error.message);
        }
    }

    static async getAllSongs() {
        try {
            const result = await db.query('SELECT * FROM song_queue ORDER BY time_submitted ASC');
            return result.rows;
        } catch (error) {
            throw new Error('Database Error: ' + error.message);
        }
    }

    static async clearAllSongs() {
        try {
            await db.query('DELETE FROM song_queue');
        } catch (error) {
            throw new Error('Database Error: ' + error.message);
        }
    }
}

module.exports = Song;
