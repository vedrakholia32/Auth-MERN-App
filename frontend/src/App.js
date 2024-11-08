import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdatePassword from './components/UpdatePassword';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home'; 

function App() {
  return (
    <Router> {/* Ensure Router is at the top level */}
      <div className="App">
        {/* We'll move the navigation buttons into a separate component */}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/update-password" element={<PrivateRoute element={<UpdatePassword />} />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
