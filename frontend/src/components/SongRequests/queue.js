import React, { useState, useEffect } from 'react';
import ReturnToSongRequests from "../NavButtons/ReturnToSongRequests";
import axios from 'axios';
import '../../styling/queue.css'

const Queue = (e) => {
    const [queue, setQueue] = useState([]);

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
    
        const intervalId = setInterval(fetchQueue, 5000);
        return () => clearInterval(intervalId);
    }, []);
    

    return(
        <div>
            <ReturnToSongRequests/>
            <h1>This is the song queue.</h1>
            <ul className="queue">
                {queue.map((request) => (
                    <li className="queueItems" key={request.id}>
                        <span>{request.name} - Requested by <strong>{request.username}</strong></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Queue