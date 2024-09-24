import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './components/Auth/loginpage';

function App() {
  return (
    <Router>  {/* Wrap everything inside BrowserRouter */}
      <div>
        <Routes>  {/* Routes component should be inside Router */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
