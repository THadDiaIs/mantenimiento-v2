import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/Usuario/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error de autenticación' };
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const response = await api.get('/Usuario/current');
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    localStorage.removeItem('token');
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  // Don't redirect here to prevent potential loops
  // The component will handle the redirect
};
