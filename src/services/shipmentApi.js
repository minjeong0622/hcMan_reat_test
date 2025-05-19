// src/services/shipmentApi.js
import apiClient from '../axiosConfig';

export const fetchShipments = async () => {
  const response = await apiClient.get('/shipments');
  return response.data;
};

export const fetchShipmentById = async (id) => {
  const response = await apiClient.get(`/shipments/${id}`);
  return response.data;
};

export const createShipment = async (shipmentData) => {
  const response = await apiClient.post('/shipments', shipmentData);
  return response.data;
};

export const updateShipment = async (id, shipmentData) => {
  const response = await apiClient.put(`/shipments/${id}`, shipmentData);
  return response.data;
};
