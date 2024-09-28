import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, setUser, setIsLoggedIn }) => {
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch profile from backend
        if (user) {
            setName(user.name || '');
            setProfilePicture(user.profile_picture_url || '');
        }
    }, [user]);

    const handleSave = async () => {
        try {
            // Placeholder for saving profile
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsLoggedIn(false); 
        setUser(null);
        navigate('/login');
    };

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <label>Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Profile Picture URL:</label>
                <input value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;