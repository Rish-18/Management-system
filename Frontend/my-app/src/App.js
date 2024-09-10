import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/dashboard/AdminDashboard';
import StockManagerDashboard from './components/dashboard/StockManagerDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  const getDashboardRoute = () => {
    if (role === 'Admin') return '/admin';
    if (role === 'Stock Manager') return '/stock-manager';
    if (role === 'User') return '/user';
    return '/login';
  };

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to={getDashboardRoute()} /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={token ? <Navigate to={getDashboardRoute()} /> : <Register />} />
        <Route
          path="/admin"
          element={role === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/stock-manager"
          element={role === 'Stock Manager' ? <StockManagerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={role === 'User' ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;