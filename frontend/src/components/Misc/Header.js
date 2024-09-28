import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <header>
            <h1>Your App Name</h1>
            <nav>
                {user ? (
                    <>
                        <span>Welcome, {user.username}!</span>
                        <button onClick={handleLogout}>Logout</button>
                        {user.admin && (
                            <button onClick={() => navigate('/admin')}>Admin</button>
                        )}
                    </>
                ) : null}
            </nav>
        </header>
    );
};

export default Header;
