import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuthProvider';  
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Expense from './components/Expense';
import Profile from './components/Profile';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast'; 

function App() {
  const [token] = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/add-expense" 
          element={token ? <Expense /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={token ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Toaster /> 
    </div>
  );
}

export default App;
