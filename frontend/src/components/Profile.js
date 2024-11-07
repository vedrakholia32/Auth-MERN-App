import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token);
    
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((err) => {
          console.error(err);
          navigate('/login');
        });
    }
  }, [navigate]);

   const handleLogout = () => {
    // Remove token from localStorage to log out the user
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <nav>
        {/* <button onClick={() => window.location.href = '/update-password'}>Update Password</button> */}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default Profile;
