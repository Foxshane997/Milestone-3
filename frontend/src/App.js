import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/loginpage';
import Register from './components/Auth/Register';
import SongRequests from './components/SongRequests/SongRequests';
import AdminPage from './components/AdminPage/AdminPage';
import Header from '../src/components/Misc/Header';
import Queue from './components/SongRequests/queue';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser(decodedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <Router>
            <div>
                <Header user={user} handleLogout={handleLogout} />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/" element={<Queue />} />
                    <Route path="/songrequests" element={isLoggedIn ? <SongRequests user={user} /> : <Navigate to="/login" />} />
                    
                    {/* Protected Routes */}
                    <Route path="/adminpage" element={isLoggedIn && user?.admin ? <AdminPage /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
