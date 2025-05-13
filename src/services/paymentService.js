import api from './api';

const PAYMENTS_ENDPOINT = '/api/Pago';

export const getPayments = async (params = {}) => {
  try {
    const response = await api.get(PAYMENTS_ENDPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error.response?.data || { message: 'Error al obtener los pagos' };
  }
};

export const getPaymentById = async (id) => {
  try {
    const response = await api.get(`${PAYMENTS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payment with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al obtener el pago' };
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await api.post(PAYMENTS_ENDPOINT, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error.response?.data || { message: 'Error al crear el pago' };
  }
};

export const updatePayment = async (id, paymentData) => {
  try {
    const response = await api.put(`${PAYMENTS_ENDPOINT}/${id}`, paymentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al actualizar el pago' };
  }
};

export const deletePayment = async (id) => {
  try {
    const response = await api.delete(`${PAYMENTS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting payment with id ${id}:`, error);
    throw error.response?.data || { message: 'Error al eliminar el pago' };
  }
};

export const getPaymentsByOrder = async (orderId) => {
  try {
    const response = await api.get(`${PAYMENTS_ENDPOINT}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payments for order ${orderId}:`, error);
    throw error.response?.data || { message: 'Error al obtener los pagos de la orden' };
  }
};

export const processPayment = async (paymentData) => {
  try {
    const response = await api.post(`${PAYMENTS_ENDPOINT}/process`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error.response?.data || { message: 'Error al procesar el pago' };
  }
};
