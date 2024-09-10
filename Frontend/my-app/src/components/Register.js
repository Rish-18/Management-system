import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';  

function Register() {
  const [userData, setUserData] = useState({ username: '', password: '', role: 'User' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      alert("Registration successful");
      navigate('/login');
    } catch (error) {
      console.error("Registration failed", error);
      alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <select
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <option value="User">User</option>
            <option value="Stock Manager">Stock Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
