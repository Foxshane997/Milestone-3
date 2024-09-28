import React from 'react';

const Header = ({ user, handleLogout }) => {
    return (
        <header>
            {user ? (
                <>
                    <p>Hello, {user.username}!</p>
                    {user.admin && <p>You are an admin.</p>}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Please log in</p>
            )}
        </header>
    );
};

export default Header;
