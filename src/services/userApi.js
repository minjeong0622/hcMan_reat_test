// src/services/userApi.js
import apiClient from '../axiosConfig';

export const getUsers = async () => {
  console.log("📦 사용자 목록 요청 중...");
  const response = await apiClient.get("/users");
  console.log("✅ 백엔드 응답 데이터:", response.data);
  return response.data;
};

export const searchUsers = async (query) => {
  const res = await apiClient.get(`/users/search?query=${encodeURIComponent(query)}`);
  return res.data;
};

export const createUser = async (userData) => {
  console.log("🛒 사용자 등록 요청 데이터:", userData);
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const updateUser = async (userData) => {
  console.log("🛒 사용자 수정 요청 데이터:", userData);
  const response = await apiClient.put(`/users/${userData.id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  console.log("🛒 사용자 삭제 요청, id:", id);
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
