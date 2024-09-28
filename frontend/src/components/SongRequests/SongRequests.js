import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReturnToQueue from '../Misc/ReturnToQueue';

const SongRequests = ({ user }) => {
    const [song, setSong] = useState(''); // Capture selected song
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSongRequest = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const currentTime = new Date().toISOString(); // Get current timestamp

        try {
            const response = await fetch('BACKEND_URL/api/songrequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Optional: Add token to request
                },
                body: JSON.stringify({ username: user.username, song, requestTime: currentTime }), // Send username, song, and current time
            });

            if (response.ok) {
                navigate('/queue'); // Navigate to queue page after successful request
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Request Failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
            <ReturnToQueue/>
            <h1>Song Request Page</h1>
            <form onSubmit={handleSongRequest}>
                <label htmlFor="song">Request a song:</label>
                <select id="song" name="song" value={song} onChange={(e) => setSong(e.target.value)} required>
                    <option value="">Select a song</option>
                    <option value="song1">Song 1</option>
                    <option value="song2">Song 2</option>
                    <option value="song3">Song 3</option>
                    <option value="song4">Song 4</option>
                </select>
                <br />

                <button type="submit">Request</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SongRequests;
