import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/product';
import { addUser, deleteUser } from '../../services/user';
import axios from 'axios';
import '../../styles/AdminDashboard.css'; 

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'User' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchProducts();
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setUsers([...users, newUser]);
      setNewUser({ username: '', password: '', role: 'User' });
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className='adminDashboard'>
      <div className='container'>
        <h1>Admin Dashboard</h1>

        {/* Products Section */}
        <div>
          <h2>View Products</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.stockQuantity}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Users Section */}
        <div>
          <h2>Manage Users</h2>
          <div>
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Stock Manager">Stock Manager</option>
              <option value="Admin">Admin</option>
            </select>
            <button className="addUser" onClick={handleAddUser}>Add User</button>
          </div>

          {/* Users Table */}
          <div>
            <h3>Existing Users</h3>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="deleteUser" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
