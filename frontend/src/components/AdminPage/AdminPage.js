import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({ user }) => {
    const navigate = useNavigate();

    // Redirect if the user is not an admin
    useEffect(() => {
        if (!user || !user.admin) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>This is the Admin page.</h1>
            {user?.admin && <p>Welcome, Admin {user.username}!</p>}
            <p>You can clear the queue here.</p>
            <button onClick={() => navigate('/')}>Go to Home</button> {/* Button to go to Home */}
        </div>
    );
};

export default AdminPage;
