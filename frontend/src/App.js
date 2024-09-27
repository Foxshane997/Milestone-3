import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './components/Auth/loginpage';
import Register from './components/Auth/Register';
import SongRequests from './components/SongRequests/SongRequests';
import AdminPage from './components/AdminPage/AdminPage';

function App() {
  return (
    <Router>  {/* Wrap everything inside BrowserRouter */}
      <div>
        <Routes>  {/* Routes component should be inside Router */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/songrequests" element={<SongRequests />} />
          <Route path="/adminpage" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
