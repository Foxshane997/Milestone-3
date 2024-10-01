// src/App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/loginpage';
import Register from './components/Auth/Register';
import SongRequests from './components/SongRequests/SongRequests';
import AdminPage from './components/AdminPage/AdminPage';
import Header from './components/Misc/Header';
import Queue from './components/SongRequests/queue';
import SpotifyLogin from './components/Auth/SpotifyLogin';
import { getSpotifyToken } from './utils/auth';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [spotifyToken, setSpotifyToken] = useState(null);

    // Check for token in local storage for normal login
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser(decodedToken);
        }
    }, []);

    // Handle Spotify authentication and token
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            getSpotifyToken(code).then((data) => {
                setSpotifyToken(data.access_token);
                localStorage.setItem('spotifyToken', data.access_token);
                window.history.pushState({}, '', '/'); // Clear the URL after login
            });
        } else {
            const storedSpotifyToken = localStorage.getItem('spotifyToken');
            if (storedSpotifyToken) {
                setSpotifyToken(storedSpotifyToken);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('spotifyToken');
        setIsLoggedIn(false);
        setUser(null);
        setSpotifyToken(null);
    };

    return (
        <Router>
            <div>
                <Header user={user} handleLogout={handleLogout} />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Queue />} />
                    <Route path="/spotify-login" element={<SpotifyLogin />} />

                    {/* Protected Routes */}
                    <Route path="/songrequests" element={isLoggedIn ? <SongRequests user={user} spotifyToken={spotifyToken} /> : <Navigate to="/login" />} />
                    <Route path="/admin" element={isLoggedIn && user?.admin ? <AdminPage user={user} /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

