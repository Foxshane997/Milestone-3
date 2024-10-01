import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styling/Login.css'

const LoginPage = ({ setIsLoggedIn, setUser }) => {
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

            localStorage.setItem('token', data.token);

            setIsLoggedIn(true);
            setUser({
                id: data.user.id,
                username: data.user.username,
                admin: data.user.admin,
            });

            toast.success(`Welcome back, ${data.user.username}!`);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>This is the login page.</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <button type="submit" className="login-button"> Login </button>
                </div>
            </form>
            <div>
                <p> Don't have an account? </p>
                <Link to="/Register">
                    <button> Register my boi </button>
                </Link>
            </div>
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
        </div>
    );
};

export default LoginPage;
