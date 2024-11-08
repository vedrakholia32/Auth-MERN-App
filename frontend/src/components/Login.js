import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
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
      // Corrected: Use formData.email and formData.password
      const response = await axios.post('http://localhost:3000/login', {
        email: formData.email,
        password: formData.password,
      });

      // Save the token if login is successful
      localStorage.setItem('token', response.data.token);
      
      // Redirect to dashboard or home page after login
      navigate('/profile'); // Adjust as needed

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="login-input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="login-input"
        required
      />
      <button type="submit" className="login-button">Login</button>
    </form>
    {error && <p className="error-message">{error}</p>}
    <nav className="signup-link">
      <button onClick={() => navigate('/signup')} className="link-button">
        Don't have an account? Sign Up
      </button>
    </nav>
  </div>
  );
}

export default Login;
