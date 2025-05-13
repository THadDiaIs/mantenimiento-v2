import api from './api';

const USERS_ENDPOINT = '/api/Usuario';

export const getUsers = async () => {
  try {
    const response = await api.get(USERS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response?.data || { message: 'Error al obtener los usuarios' };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`${USERS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el usuario' };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post(USERS_ENDPOINT, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error.response?.data || { message: 'Error al crear el usuario' };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`${USERS_ENDPOINT}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el usuario' };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`${USERS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el usuario' };
  }
};

export const updateUserPassword = async (id, passwordData) => {
  try {
    const response = await api.put(`${USERS_ENDPOINT}/${id}/password`, passwordData);
    return response.data;
  } catch (error) {
    console.error(`Error updating password for user ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar la contraseña' };
  }
};
