import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReturnToQueue from '../NavButtons/ReturnToQueue';
import '../../styling/SongRequests.css';

const SongRequests = ({ user }) => {
    const [query, setQuery] = useState(''); // For searching songs
    const [results, setResults] = useState([]); // Search results
    const [selectedSong, setSelectedSong] = useState(''); // Selected song
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Search for a song
    const handleSearch = async () => {
        setError(''); // Clear previous errors
        try {
            const response = await axios.get(`http://localhost:9000/api/songs/search`, { params: { query } });
            setResults(response.data.tracks.items); // Adjust based on response structure
        } catch (err) {
            console.error('Error fetching song data:', err);
            setError('Error fetching song data. Please try again.');
        }
    };

    // Submit the selected song request to the backend
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
                body: JSON.stringify({ username: user.username, song: selectedSong, requestTime: currentTime }), // Send username, selected song, and current time
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
            
            {/* Search Functionality */}
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a song"
                />
                <button type="button" onClick={handleSearch}>Search</button>
            </div>

            {/* Display Search Results */}
            {results.length > 0 && (
                <ul>
                    {results.map((track) => (
                        <li key={track.id} onClick={() => setSelectedSong(track.name)}>
                            {track.name} by {track.artists[0].name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Submit Song Request */}
            {selectedSong && (
                <form onSubmit={handleSongRequest}>
                    <h3>Selected Song: {selectedSong}</h3>
                    <button type="submit">Request This Song</button>
                </form>
            )}
        </div>
    );
};

export default SongRequests;
