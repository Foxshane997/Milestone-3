import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.admin) {
            navigate('/');
        }
    }, [user, navigate]);

    const clearQueue = async () => {
        try {
            const response = await axios.delete('https://milestone-3-production.up.railway.app/api/songQueue/clear');
            console.log('Queue cleared:', response.data);
            toast.success('Queue cleared successfully!');
        } catch (error) {
            console.error('Error clearing the queue:', error);
            toast.error('Failed to clear the queue. Please try again.');
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1>This is the Admin page.</h1>
            {user?.admin && <p>Welcome, Admin {user.username}!</p>}
            <p>You can clear the queue here.</p>
            <button onClick={clearQueue}>Clear Queue</button>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

export default AdminPage;
