import axios from 'axios';

const backendUrl = 'http://localhost:5000';  // Adjust if needed

export const redirectToSpotifyLogin = () => {
    window.location.href = `${backendUrl}/spotify/login`;
};

export const getSpotifyToken = async (code) => {
    const response = await axios.get(`${backendUrl}/spotify/callback`, {
        params: { code }
    });
    return response.data;
};
