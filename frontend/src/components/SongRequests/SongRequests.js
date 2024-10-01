import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReturnToQueue from '../NavButtons/ReturnToQueue';
import '../../styling/SongRequests.css';

const SongRequests = ({ user }) => {
    const [query, setQuery] = useState(''); // For searching songs
    const [results, setResults] = useState([]); // Search results
    const [selectedSongId, setSelectedSongId] = useState(''); // Selected song ID
    const [selectedSongName, setSelectedSongName] = useState(''); // Selected song name
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Search for a song
    const handleSearch = async () => {
        setError(''); // Clear previous errors
        try {
            const response = await axios.get(`https://milestone-3-production.up.railway.app/api/songs/search`, { params: { query } });
            setResults(response.data.tracks.items); // Adjust based on response structure
        } catch (err) {
            console.error('Error fetching song data:', err);
            setError('Error fetching song data. Please try again.');
        }
    };

    // Handle "Enter" key press for search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    // Submit the selected song request to the backend
    const handleSongRequest = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const currentTime = new Date().toISOString(); // Get current timestamp

        try {
            const response = await fetch('https://milestone-3-production.up.railway.app/api/songQueue/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username, name: selectedSongName, requestTime: currentTime }), // Send username, selected song, and current time
            });

            if (response.ok) {
                navigate('/'); // Navigate to queue page after successful request
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
                    onKeyPress={handleKeyPress} // Handle Enter key press
                    placeholder="Search for a song"
                />
                <button type="button" onClick={handleSearch}>Search</button>
            </div>

            {/* Display Search Results */}
            {results.length > 0 && (
                <ul className="searchResults">
                    {results.map((track) => (
                        <li
                            className={`searchItems ${track.id === selectedSongId ? 'selected' : ''}`} 
                            key={track.id}
                            onClick={() => {
                                setSelectedSongId(track.id);
                                setSelectedSongName(track.name);
                            }}
                        >
                            {track.name} by {track.artists[0].name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Submit Song Request */}
            {selectedSongName && (
                <form className="requestButton" onSubmit={handleSongRequest}>
                    <h3>Selected Song: {selectedSongName}</h3>
                    <button type="submit">Request This Song</button>
                </form>
            )}
        </div>
    );
};

export default SongRequests;
