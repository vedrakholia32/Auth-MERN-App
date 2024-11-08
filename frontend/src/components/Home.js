import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Home.css';  // Add CSS for styling

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Our App!</h1>
      <p>Your go-to platform for seamless user management.</p>

      <div className="button-container">
        <button onClick={() => navigate('/signup')} className="btn">Sign Up</button>
        <button onClick={() => navigate('/login')} className="btn">Login</button>
      </div>
    </div>
  );
}

export default Home;
