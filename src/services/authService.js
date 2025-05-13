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
    const response = await api.get('/Usuario/current');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener el usuario actual' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
