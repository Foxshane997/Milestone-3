import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styling/Header.css';

const Header = ({ user, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <header>
            <h1>CliquePlay</h1>
            <nav>
                {user ? (
                    <>
                        <span className='header-span'>Welcome, {user.username}!</span>
                        <div className="button-container">
                            <button onClick={handleLogout}>Logout</button>
                            {user.admin && (
                                <button onClick={() => navigate('/admin')}>Admin</button>
                            )}
                        </div>
                    </>
                ) : null}
            </nav>
        </header>
    );
};

export default Header;
