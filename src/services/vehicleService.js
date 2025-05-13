import api from './api';

const VEHICLES_ENDPOINT = '/api/Vehiculo';

export const getVehicles = async () => {
  try {
    const response = await api.get(VEHICLES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error.response?.data || { message: 'Error al obtener los vehículos' };
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await api.get(`${VEHICLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el vehículo' };
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    const response = await api.post(VEHICLES_ENDPOINT, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error.response?.data || { message: 'Error al crear el vehículo' };
  }
};

export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await api.put(`${VEHICLES_ENDPOINT}/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating vehicle with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el vehículo' };
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await api.delete(`${VEHICLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting vehicle with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el vehículo' };
  }
};

export const getVehicleMaintenanceHistory = async (vehicleId) => {
  try {
    const response = await api.get(`${VEHICLES_ENDPOINT}/${vehicleId}/maintenance`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching maintenance history for vehicle ${vehicleId}:`, error);
    throw error.response?.data || { message: 'Error al obtener el historial de mantenimiento' };
  }
};
