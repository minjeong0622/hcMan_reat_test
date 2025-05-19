// src/services/inspectionApi.js
import apiClient from '../axiosConfig';

export const fetchInspections = async () => {
  const response = await apiClient.get('/inspections');
  return response.data;
};

export const fetchInspectionById = async (id) => {
  const response = await apiClient.get(`/inspections/${id}`);
  return response.data;
};

export const createInspection = async (inspectionData) => {
  const response = await apiClient.post('/inspections', inspectionData);
  return response.data;
};

export const updateInspection = async (id, inspectionData) => {
  const response = await apiClient.put(`/inspections/${id}`, inspectionData);
  return response.data;
};
