import React, { useState, useEffect } from 'react';
import ReturnToSongRequests from "../NavButtons/ReturnToSongRequests";
import axios from 'axios';
import '../../styling/queue.css';

const Queue = () => {
    const [queue, setQueue] = useState([]);
    const [songDetails, setSongDetails] = useState({});
    const [currentTrackUri, setCurrentTrackUri] = useState(null);

    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const response = await axios.get(`https://milestone-3-production.up.railway.app/api/songQueue/`);
                setQueue(response.data);
            } catch (error) {
                console.error('Error fetching queue:', error.response ? error.response.data : error.message);
            }
        };

        fetchQueue();

    }, []);

    useEffect(() => {
        const fetchAllSongDetails = async () => {
            const songsToFetch = queue.filter(request => !songDetails[request.name]);

            for (const request of songsToFetch) {
                try {
                    const response = await axios.get(`https://milestone-3-production.up.railway.app/api/songs/track/${request.name}`);
                    setSongDetails(prevState => ({
                        ...prevState,
                        [request.name]: response.data
                    }));
                } catch (error) {
                    console.error('Error fetching song details:', error);
                }
            }
        };

        if (queue.length > 0) {
            fetchAllSongDetails();
        }
    }, [queue, songDetails]);

    const handlePlayTrack = (trackId) => {
        setCurrentTrackUri(trackId);
    };

    return (
        <div>
            <ReturnToSongRequests />
            <h1>This is the song queue.</h1>
            {currentTrackUri && (
                <div style={{ marginBottom: '20px' }}>
                    <iframe
                        src={`https://open.spotify.com/embed/track/${currentTrackUri}`}
                        width="300"
                        height="80"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        title="Spotify Player"
                    ></iframe>
                </div>
            )}

            <ul className="queue">
                {queue.map((request) => (
                    <li className="queueItems" key={request.id}>
                        {songDetails[request.name] ? (
                            <span>
                                {songDetails[request.name].name} - Requested by <strong>{request.username}</strong>
                                <button
                                    onClick={() => handlePlayTrack(request.name)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Play
                                </button>
                            </span>
                        ) : (
                            <span>Loading song details...</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Queue;
