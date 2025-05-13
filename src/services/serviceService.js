import api from './api';

const SERVICES_ENDPOINT = '/api/Servicio';

export const getServices = async (params = {}) => {
  try {
    const response = await api.get(SERVICES_ENDPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error.response?.data || { message: 'Error al obtener los servicios' };
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await api.get(`${SERVICES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el servicio' };
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await api.post(SERVICES_ENDPOINT, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error.response?.data || { message: 'Error al crear el servicio' };
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`${SERVICES_ENDPOINT}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el servicio' };
  }
};

export const deleteService = async (id) => {
  try {
    const response = await api.delete(`${SERVICES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el servicio' };
  }
};

export const getServiceCategories = async () => {
  try {
    const response = await api.get(`${SERVICES_ENDPOINT}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service categories:', error);
    throw error.response?.data || { message: 'Error al obtener las categorías de servicios' };
  }
};

export const getServicesByVehicle = async (vehicleId) => {
  try {
    const response = await api.get(`${SERVICES_ENDPOINT}/vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching services for vehicle ${vehicleId}:`, error);
    throw error.response?.data || { message: 'Error al obtener los servicios del vehículo' };
  }
};
