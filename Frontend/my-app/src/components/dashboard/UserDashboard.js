import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/product';
import '../../styles/UserDashboard.css'; 

function UserDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, []);

  return (
    <div className="userdashboard">
      <h1>User Dashboard</h1>
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
  );
}

export default UserDashboard;
