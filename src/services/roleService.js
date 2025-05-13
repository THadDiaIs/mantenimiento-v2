import api from './api';

const ROLES_ENDPOINT = '/api/Rol';

export const getRoles = async () => {
  try {
    const response = await api.get(ROLES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error.response?.data || { message: 'Error al obtener los roles' };
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await api.get(`${ROLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el rol' };
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await api.post(ROLES_ENDPOINT, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error.response?.data || { message: 'Error al crear el rol' };
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const response = await api.put(`${ROLES_ENDPOINT}/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el rol' };
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await api.delete(`${ROLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el rol' };
  }
};
