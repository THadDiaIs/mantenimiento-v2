import api from './api';

const EMPLOYEES_ENDPOINT = '/api/Empleado';

export const getEmployees = async (params = {}) => {
  try {
    const response = await api.get(EMPLOYEES_ENDPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error.response?.data || { message: 'Error al obtener los empleados' };
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await api.get(`${EMPLOYEES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el empleado' };
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post(EMPLOYEES_ENDPOINT, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error.response?.data || { message: 'Error al crear el empleado' };
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await api.put(`${EMPLOYEES_ENDPOINT}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el empleado' };
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`${EMPLOYEES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el empleado' };
  }
};

export const getEmployeeAssignments = async (employeeId) => {
  try {
    const response = await api.get(`${EMPLOYEES_ENDPOINT}/${employeeId}/assignments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching assignments for employee ${employeeId}:`, error);
    throw error.response?.data || { message: 'Error al obtener las asignaciones del empleado' };
  }
};

export const getAvailableEmployees = async (params = {}) => {
  try {
    const response = await api.get(`${EMPLOYEES_ENDPOINT}/available`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching available employees:', error);
    throw error.response?.data || { message: 'Error al obtener los empleados disponibles' };
  }
};
