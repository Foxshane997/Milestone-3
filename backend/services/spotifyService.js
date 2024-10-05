const axios = require('axios');
require('dotenv').config();

const getAccessToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data.access_token;
};

const searchSong = async (query) => {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            q: query,
            type: 'track'
        }
    });
    return response.data;
};

const getTrackById = async (trackId) => {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

module.exports = { searchSong, getTrackById };

