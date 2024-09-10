import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

export const getProducts = async () => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const addProduct = async (productData) => {
  return await axios.post(`${API_URL}/add`, productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const updateProduct = async (id, productData) => {
  return await axios.put(`${API_URL}/update/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
