import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import HomePage from './components/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;