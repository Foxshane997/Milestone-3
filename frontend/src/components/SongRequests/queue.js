import React, { useState, useEffect } from 'react';
import ReturnToSongRequests from "../NavButtons/ReturnToSongRequests";
import axios from 'axios';
import '../../styling/queue.css'

const Queue = (e) => {
    const [queue, setQueue] = useState([]);

    useEffect(() =>{
        const fetchQueue = async () => {
            try {
                const response = await axios.get(`BACKEND URL`);
                setQueue(response.data);
            } catch (error) {
                console.error('Error fetching queue:', error);
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
            <ul>
                {queue.map((request) => (
                    <li key={request.id}>
                        <span>{request.name} - Requested by {request.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Queue