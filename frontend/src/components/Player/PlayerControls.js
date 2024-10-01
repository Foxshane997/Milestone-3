import React from 'react';

const PlayerControls = ({ playTrack, pauseTrack, skipTrack }) => {
    return (
        <div>
            <button onClick={playTrack}>Play</button>
            <button onClick={pauseTrack}>Pause</button>
            <button onClick={skipTrack}>Next</button>
        </div>
    );
};

export default PlayerControls;
