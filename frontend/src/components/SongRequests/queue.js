import React, { useState, useEffect } from 'react';
import ReturnToSongRequests from "../NavButtons/ReturnToSongRequests";
import axios from 'axios';
import '../../styling/queue.css';

const Queue = () => {
    const [queue, setQueue] = useState([]);
    const [songDetails, setSongDetails] = useState({}); // Store fetched song details
    const [currentTrackUri, setCurrentTrackUri] = useState(null); // Track URI to embed

    // Fetch queue data periodically
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

    // Fetch song details when the queue or songDetails changes
    useEffect(() => {
        const fetchAllSongDetails = async () => {
            const songsToFetch = queue.filter(request => !songDetails[request.name]); // Only fetch details for songs we haven't fetched yet

            for (const request of songsToFetch) {
                try {
                    const response = await axios.get(`https://milestone-3-production.up.railway.app/api/songs/track/${request.name}`);
                    setSongDetails(prevState => ({
                        ...prevState,
                        [request.name]: response.data // Store song details by track ID (request.name)
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

    // Handle track selection and display embedded Spotify player
    const handlePlayTrack = (trackId) => {
        setCurrentTrackUri(trackId); // Set the selected track URI for embedding
    };

    return (
        <div>
            <ReturnToSongRequests />
            <h1>This is the song queue.</h1>

            {/* Spotify Embed Player */}
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
