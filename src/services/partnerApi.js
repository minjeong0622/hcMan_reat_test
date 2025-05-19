// src/services/partnerApi.js
import apiClient from '../axiosConfig';

export const fetchPartners = async () => {
  // baseURL에 이미 '/api'가 포함되어 있으므로, 여기서는 '/partners'만 사용합니다.
  const res = await apiClient.get('/partners');
  return res.data;
};

export const searchPartners = async (query) => {
  // 백엔드에서 "/api/partners/search?query=..." 엔드포인트를 구현했다면,
  // 여기서는 '/partners/search'로 호출합니다.
  const res = await apiClient.get(`/partners/search?query=${encodeURIComponent(query)}`);
  return res.data;
};

export const fetchPartnerById = async (id) => {
  const res = await apiClient.get(`/partners/${id}`);
  return res.data;
};

export const createPartner = async (partnerData) => {
  const res = await apiClient.post('/partners', partnerData);
  return res.data;
};

export const updatePartner = async (id, partnerData) => {
  const res = await apiClient.put(`/partners/${id}`, partnerData);
  return res.data;
};

export const deletePartner = async (id) => {
  await apiClient.delete(`/partners/${id}`);
};
