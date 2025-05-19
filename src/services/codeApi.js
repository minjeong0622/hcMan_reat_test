// src/services/codeApi.js
import apiClient from '../axiosConfig';

export const fetchCodes = async (parent) => {
  const res = await apiClient.get('/codes', { params: { parent } });
  return res.data;
};

export const createOrUpdateCode = async (codeData) => {
  const res = await apiClient.post('/codes', codeData);
  return res.data;
};
