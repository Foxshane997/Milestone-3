import React, { useEffect, useState } from 'react';
import PlayerControls from './PlayerControls';

const SpotifyPlayer = ({ token }) => {
    const [deviceId, setDeviceId] = useState(null);

    useEffect(() => {
        if (window.Spotify) {
            const player = new window.Spotify.Player({
                name: 'Spotify Web Player',
                getOAuthToken: cb => cb(token),
            });

            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id);
            });

            player.connect();
        }
    }, [token]);

    const playTrack = () => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: ['spotify:track:YOUR_TRACK_URI'] }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    };

    const pauseTrack = () => {
        fetch('https://api.spotify.com/v1/me/player/pause', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    const skipTrack = () => {
        fetch('https://api.spotify.com/v1/me/player/next', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    };

    return <PlayerControls playTrack={playTrack} pauseTrack={pauseTrack} skipTrack={skipTrack} />;
};

export default SpotifyPlayer;
