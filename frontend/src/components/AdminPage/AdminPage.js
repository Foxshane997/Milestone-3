import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.admin) {
            navigate('/');
        }
    }, [user, navigate]);

    const clearQueue = async () => {
        try {
            const response = await axios.delete('https://milestone-3-production.up.railway.app/api/songQueue/clear'); // Use your deployed URL when in production
            console.log('Queue cleared:', response.data);
            // Optionally, you can add any UI feedback here
        } catch (error) {
            console.error('Error clearing the queue:', error);
        }
    };

    return (
        <div>
            <h1>This is the Admin page.</h1>
            {user?.admin && <p>Welcome, Admin {user.username}!</p>}
            <p>You can clear the queue here.</p>
            <button onClick={clearQueue}>Clear Queue</button>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

export default AdminPage;
