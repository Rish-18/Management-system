import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const addUser = async (userData) => {
  return await axios.post(`${API_URL}/add`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
