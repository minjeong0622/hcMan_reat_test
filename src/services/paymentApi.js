// src/services/paymentApi.js
import apiClient from '../axiosConfig';

export const fetchPayments = async (searchParams = {}) => {
  // 빈 문자열이면 파라미터에서 제거
  const params = {};
  if (searchParams.orderId && searchParams.orderId.trim() !== "") {
    params.orderId = searchParams.orderId.trim();
  }
  const response = await apiClient.get('/payments', { params });
  return response.data;
};

export const fetchPaymentById = async (id) => {
  const response = await apiClient.get(`/payments/${id}`);
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await apiClient.post('/payments', paymentData);
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await apiClient.put(`/payments/${id}`, paymentData);
  return response.data;
};
