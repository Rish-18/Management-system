import React, { useState, useEffect } from 'react';
import { getProducts, updateProduct, deleteProduct } from '../../services/product';
import '../../styles/StockManagerDashboard.css'; 

function StockManagerDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, []);

  const handleStockChange = (id) => {
    updateProduct(id, { stockQuantity: newStock })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, stockQuantity: newStock } : product
          )
        );
        setEditingProductId(null); 
      })
      .catch((error) => {
        console.error('Error updating stock', error);
      });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting product', error);
      });
  };

  const startEditing = (id, currentStock) => {
    setEditingProductId(id);
    setNewStock(currentStock);
  };

  return (
    <div className="stockmanager">
      <div className="container">
        <h1>Stock Manager Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                    />
                  ) : (
                    product.stockQuantity
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <button className="save" onClick={() => handleStockChange(product._id)}>
                      Save
                    </button>
                  ) : (
                    <button className="save" onClick={() => startEditing(product._id, product.stockQuantity)}>
                      Edit
                    </button>
                  )}
                  <button className="delete" onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockManagerDashboard;
