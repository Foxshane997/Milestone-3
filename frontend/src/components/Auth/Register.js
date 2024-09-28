import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after registration

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // To navigate after successful registration

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;  // Ensure you are getting these values
        const password = e.target.password.value;
    
        try {
            const response = await fetch(`https://milestone-3-production.up.railway.app/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, admin: false }),
            });
    
            if (response.ok) {
                // Navigate to login page or another route after successful registration
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };
    

    return (
        <div>
            <h1>Registration Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="password">Password:</label>
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />

                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
