import api from './api';

const ORDERS_ENDPOINT = '/api/Orden';

export const getOrders = async (params = {}) => {
  try {
    const response = await api.get(ORDERS_ENDPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error.response?.data || { message: 'Error al obtener las órdenes' };
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`${ORDERS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener la orden' };
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post(ORDERS_ENDPOINT, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error.response?.data || { message: 'Error al crear la orden' };
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`${ORDERS_ENDPOINT}/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar la orden' };
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`${ORDERS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar la orden' };
  }
};

// Order Details

export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`${ORDERS_ENDPOINT}/${orderId}/details`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for order ${orderId}:`, error);
    throw error.response?.data || { message: 'Error al obtener los detalles de la orden' };
  }
};

export const addOrderDetail = async (orderId, detailData) => {
  try {
    const response = await api.post(`${ORDERS_ENDPOINT}/${orderId}/details`, detailData);
    return response.data;
  } catch (error) {
    console.error('Error adding order detail:', error);
    throw error.response?.data || { message: 'Error al agregar el detalle de la orden' };
  }
};

export const updateOrderDetail = async (orderId, detailId, detailData) => {
  try {
    const response = await api.put(`${ORDERS_ENDPOINT}/${orderId}/details/${detailId}`, detailData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order detail ${detailId}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el detalle de la orden' };
  }
};

export const deleteOrderDetail = async (orderId, detailId) => {
  try {
    const response = await api.delete(`${ORDERS_ENDPOINT}/${orderId}/details/${detailId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order detail ${detailId}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el detalle de la orden' };
  }
};
