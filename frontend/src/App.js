import './App.css';
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import LoginPage from './components/Auth/loginpage';
import Register from './components/Auth/Register';
import SongRequests from './components/SongRequests/SongRequests';
import AdminPage from './components/AdminPage/AdminPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set logged-in state if token exists
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/songrequests" element={isLoggedIn ? <SongRequests /> : <Navigate to="/" />} />
          <Route path="/adminpage" element={isLoggedIn ? <AdminPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
