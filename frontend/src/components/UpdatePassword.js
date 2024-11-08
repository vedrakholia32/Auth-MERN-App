import React, { useState } from 'react';
import axios from 'axios';

function UpdatePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in.');
      return;
    }

    try {
      await axios.put(
        'http://localhost:3000/profile/update-password',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage('Password updated successfully');
    } catch (err) {
      setError('Error updating password');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default UpdatePassword;
