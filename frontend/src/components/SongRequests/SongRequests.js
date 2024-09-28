// frontend/src/components/SongRequests/SongRequests.js
import React, { useState } from 'react';
import axios from 'axios';

const SongRequests = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

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

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a song"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <ul>
                {results.map((track) => (
                    <li key={track.id}>{track.name} by {track.artists[0].name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SongRequests;
