import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReturnToQueue from '../NavButtons/ReturnToQueue';
import '../../styling/SongRequests.css';

const SongRequests = ({ user }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState('');
    const [selectedSongName, setSelectedSongName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        setError('');
        try {
            const response = await axios.get(`https://milestone-3-production.up.railway.app/api/songs/search`, { params: { query } });
            setResults(response.data.tracks.items);
        } catch (err) {
            console.error('Error fetching song data:', err);
            setError('Error fetching song data. Please try again.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleSongRequest = async (e) => {
        e.preventDefault();

        const currentTime = new Date().toISOString();

        try {
            const response = await fetch('https://milestone-3-production.up.railway.app/api/songQueue/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username, name: selectedSongName, requestTime: currentTime }),
            });

            if (response.ok) {
                toast.success(`"${selectedSongName}" has been added to the queue!`);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
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
                    onKeyPress={handleKeyPress}
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
            
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
        </div>
    );
};

export default SongRequests;
