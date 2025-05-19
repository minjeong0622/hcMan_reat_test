// src/services/orderApi.js
import apiClient from "../axiosConfig";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// 1) 신규 발주 등록
export const createOrder = async (orderData) => {
  // orderData = { buyerId, supplierId, dueDate, warehouseLocation, note, items: [ { itemId, orderQuantity, ... }, ... ] }
  const response = await apiClient.post("/orders", orderData, { headers: getAuthHeader() });
  return response.data;
};

// 2) 주문 목록 조회 (검색조건)
export const fetchOrders = async (searchCond = {}) => {
  const params = new URLSearchParams();
  if (searchCond.buyer) params.append("buyer", searchCond.buyer);
  if (searchCond.supplier) params.append("supplier", searchCond.supplier);
  if (searchCond.startDate) params.append("startDate", searchCond.startDate);
  if (searchCond.endDate) params.append("endDate", searchCond.endDate);
  if (searchCond.orderStatus) params.append("orderStatus", searchCond.orderStatus);

  const response = await apiClient.get(`/orders?${params.toString()}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// 3) 단건 주문 조회
export const fetchOrder = async (id) => {
  const response = await apiClient.get(`/orders/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// 4) 주문 수정
export const updateOrder = async (id, updateData) => {
  const response = await apiClient.put(`/orders/${id}`, updateData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// 5) 상태 변경 (승인/출고/배송/검수/결제/완료/취소)
export const approveOrder = async (id) => {
  await apiClient.post(`/orders/${id}/approve`, null, { headers: getAuthHeader() });
};
export const shipOrder = async (id) => {
  await apiClient.post(`/orders/${id}/ship`, null, { headers: getAuthHeader() });
};
export const deliverOrder = async (id) => {
  await apiClient.post(`/orders/${id}/deliver`, null, { headers: getAuthHeader() });
};
export const inspectOrder = async (id) => {
  await apiClient.post(`/orders/${id}/inspect`, null, { headers: getAuthHeader() });
};
export const payOrder = async (id) => {
  await apiClient.post(`/orders/${id}/pay`, null, { headers: getAuthHeader() });
};
export const completeOrder = async (id) => {
  await apiClient.post(`/orders/${id}/complete`, null, { headers: getAuthHeader() });
};
export const cancelOrder = async (id) => {
  await apiClient.post(`/orders/${id}/cancel`, null, { headers: getAuthHeader() });
};
