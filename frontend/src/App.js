import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdatePassword from './components/UpdatePassword';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router> {/* Ensure Router is at the top level */}
      <div className="App">
        <Header /> {/* We'll move the navigation buttons into a separate component */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/update-password" element={<PrivateRoute element={<UpdatePassword />} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  const navigate = useNavigate(); // Use navigate here

  const token = localStorage.getItem('token'); // Check if the user is logged in


  return (
    <nav>
      {/* Render buttons based on whether the user is logged in */}
      {!token ? (
        <>
          {/* <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button onClick={() => navigate('/login')}>Login</button> */}
        </>
      ) : (
        <>
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/update-password')}>Update Password</button>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </>
      )}
    </nav>
  );
}

export default App;
