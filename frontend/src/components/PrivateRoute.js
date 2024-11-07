import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// A wrapper component to protect the route
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  // If the token is present, return the element, otherwise redirect to login
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
