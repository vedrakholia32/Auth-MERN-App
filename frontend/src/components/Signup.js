import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/Signup.css';  

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      // Save token in localStorage
      localStorage.setItem('token', response.data.token);
    //   console.log(response.data.token);
      navigate('/profile');
    } catch (err) {
      setError('Error during signup');
      console.error(err);
    }
  };

  const goHome = () => {
    navigate('/');  // Redirect to home page
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <nav className="login-link">
        <button onClick={() => window.location.href = '/login'} className="link-button">
          Already have an account? Login
        </button>
      </nav>

      <button onClick={goHome} className="home-button">
        Home
      </button>
    </div>
  );
}

export default Signup;
