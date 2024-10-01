import React from 'react';
import { redirectToSpotifyLogin } from '../../utils/auth';

const SpotifyLogin = () => {
    return (
        <div>
            <button onClick={redirectToSpotifyLogin}>
                Sign in with Spotify
            </button>
        </div>
    );
};

export default SpotifyLogin;
