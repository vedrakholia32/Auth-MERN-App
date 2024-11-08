import axios from 'axios';

// Set base URL for the API requests
const API = axios.create({
  baseURL: process.env.REACT_APP_API, // API server URL
});

// Signup API request
export const signupUser = async (data) => {
  try {
    const response = await API.post('/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login API request
export const loginUser = async (data) => {
  try {
    const response = await API.post('/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (token) => {
  try {
    const response = await API.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update password
export const updatePassword = async (data, token) => {
  try {
    const response = await API.put('/profile/password', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
