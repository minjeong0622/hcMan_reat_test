// src/services/purchaseOrderApi.js
import apiClient from "../axiosConfig";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const createPurchaseOrder = async (data) => {
  const response = await apiClient.post("/purchase-orders", data, { headers: getAuthHeader() });
  return response.data;
};

export const fetchPurchaseOrders = async (searchCond = {}) => {
  const params = new URLSearchParams();
  if (searchCond.buyer) params.append("buyer", searchCond.buyer);
  if (searchCond.supplier) params.append("supplier", searchCond.supplier);
  if (searchCond.startDate) params.append("startDate", searchCond.startDate);
  if (searchCond.endDate) params.append("endDate", searchCond.endDate);
  if (searchCond.orderStatus) params.append("orderStatus", searchCond.orderStatus);
  const response = await apiClient.get(`/purchase-orders?${params.toString()}`, { headers: getAuthHeader() });
  return response.data;
};

export const fetchPurchaseOrder = async (id) => {
  const response = await apiClient.get(`/purchase-orders/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const updatePurchaseOrder = async (id, data) => {
  const response = await apiClient.put(`/purchase-orders/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const deletePurchaseOrder = async (id) => {
  const response = await apiClient.delete(`/purchase-orders/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const approvePurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/approve`, null, { headers: getAuthHeader() });
};
export const shipPurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/ship`, null, { headers: getAuthHeader() });
};
export const deliverPurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/deliver`, null, { headers: getAuthHeader() });
};
export const inspectPurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/inspect`, null, { headers: getAuthHeader() });
};
export const payPurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/pay`, null, { headers: getAuthHeader() });
};
export const completePurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/complete`, null, { headers: getAuthHeader() });
};
export const cancelPurchaseOrder = async (id) => {
  await apiClient.post(`/purchase-orders/${id}/cancel`, null, { headers: getAuthHeader() });
};
