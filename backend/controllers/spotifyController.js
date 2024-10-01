const axios = require('axios');
require('dotenv').config();

// Step 1: Redirect to Spotify Authorization URL
const getSpotifyAuth = (req, res) => {
    const scopes = 'user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state';
    const redirectUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`;
    res.redirect(redirectUrl);
};

// Step 2: Handle Spotify callback to get access token
const handleSpotifyCallback = async (req, res) => {
    const code = req.query.code;

    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const { access_token, refresh_token, expires_in } = response.data;
    res.json({ access_token, refresh_token, expires_in });
};

module.exports = {
    getSpotifyAuth,
    handleSpotifyCallback
};
