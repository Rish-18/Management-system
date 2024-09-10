import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'; 

function Navbar({ role, onLogout }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {role === 'Admin' && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Dashboard</Link>
            </li>
          )}
          {role === 'Stock Manager' && (
            <li className="nav-item">
              <Link className="nav-link" to="/stock-manager">Stock Manager Dashboard</Link>
            </li>
          )}
          {role === 'User' && (
            <li className="nav-item">
              <Link className="nav-link" to="/user">User Dashboard</Link>
            </li>
          )}
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
