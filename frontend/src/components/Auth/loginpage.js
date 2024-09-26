import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("Username:", username, "Password:", password);
    };

    return (
        <div>
            <h1>This is the login page.</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username"> Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password"> Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit"> Login </button>
                </div>
            </form>
            <div>
                <p> Don't have an account? </p>
                <Link to="/Register.js">
                    <button> Register my boi </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage