import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState(''); // State for username input
    const [password, setPassword] = useState(''); // State for password input
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('https://milestone-3-production.up.railway.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send username and password as JSON
            });

            if (!response.ok) {
                throw new Error('Login failed! Please check your credentials.'); // Handle unsuccessful response
            }

            const data = await response.json(); // Parse JSON response
            console.log("Login successful!", data);

            // Save the token in local storage to keep the user logged in
            localStorage.setItem('token', data.token); // Store the JWT token

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
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                    />
                </div>
                <div>
                    <label htmlFor="password"> Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
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
