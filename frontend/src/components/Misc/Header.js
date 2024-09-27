import React from 'react';

const Header = ({ user, handleLogout }) => {
    return (
        <header>
            {user ? (
                <>
                    <p>Logged in as: {user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Please log in</p>
            )}
        </header>
    );
};

export default Header;