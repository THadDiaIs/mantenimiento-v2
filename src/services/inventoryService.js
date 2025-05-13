import api from './api';

const INVENTORY_ENDPOINT = '/api/Inventario';

export const getInventoryItems = async (params = {}) => {
  try {
    const response = await api.get(INVENTORY_ENDPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    throw error.response?.data || { message: 'Error al obtener los artículos del inventario' };
  }
};

export const getInventoryItemById = async (id) => {
  try {
    const response = await api.get(`${INVENTORY_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory item with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el artículo del inventario' };
  }
};

export const createInventoryItem = async (itemData) => {
  try {
    const response = await api.post(INVENTORY_ENDPOINT, itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating inventory item:', error);
    throw error.response?.data || { message: 'Error al crear el artículo del inventario' };
  }
};

export const updateInventoryItem = async (id, itemData) => {
  try {
    const response = await api.put(`${INVENTORY_ENDPOINT}/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory item with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el artículo del inventario' };
  }
};

export const deleteInventoryItem = async (id) => {
  try {
    const response = await api.delete(`${INVENTORY_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting inventory item with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el artículo del inventario' };
  }
};

export const updateInventoryQuantity = async (id, quantityData) => {
  try {
    const response = await api.put(`${INVENTORY_ENDPOINT}/${id}/quantity`, quantityData);
    return response.data;
  } catch (error) {
    console.error(`Error updating quantity for inventory item ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar la cantidad del inventario' };
  }
};

export const getLowStockItems = async (threshold = 10) => {
  try {
    const response = await api.get(`${INVENTORY_ENDPOINT}/low-stock?threshold=${threshold}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    throw error.response?.data || { message: 'Error al obtener los artículos con bajo inventario' };
  }
};

export const getInventoryCategories = async () => {
  try {
    const response = await api.get(`${INVENTORY_ENDPOINT}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory categories:', error);
    throw error.response?.data || { message: 'Error al obtener las categorías de inventario' };
  }
};
