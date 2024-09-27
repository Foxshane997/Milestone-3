import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://milestone-3-production.up.railway.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed! Please check your credentials.');
            }

            const data = await response.json();
            console.log("Login successful!", data);
            // localStorage.setItem('token', data.token); // Uncomment this line to save the token
            navigate('/'); // Redirect to the home page or desired route after successful login
        } catch (err) {
            setError(err.message); // Set error message if login fails
        }
    };

    return (
        <div>
            <h1>This is the login page.</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
                    <button type="submit"> Login </button> {/* Login button */}
                </div>
            </form>
            <div>
                <p> Don't have an account? </p>
                <Link to="/Register">
                    <button> Register my boi </button> {/* Link to Register page */}
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
