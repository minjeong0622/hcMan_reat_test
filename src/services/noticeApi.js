import apiClient from "../axiosConfig";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const createNotice = async (data) => {
  const response = await apiClient.post("/notices", data, { headers: getAuthHeader() });
  return response.data;
};

export const fetchNotices = async (searchCond = {}) => {
  const params = new URLSearchParams();
  if (searchCond.title) params.append("title", searchCond.title);
  if (searchCond.author) params.append("author", searchCond.author);
  if (searchCond.startDate) params.append("startDate", searchCond.startDate);
  if (searchCond.endDate) params.append("endDate", searchCond.endDate);
  if (searchCond.priority !== undefined) params.append("priority", searchCond.priority);
  if (searchCond.banner !== undefined) params.append("banner", searchCond.banner);
  
  const response = await apiClient.get(`/notices?${params.toString()}`, { headers: getAuthHeader() });
  return response.data;
};

export const fetchNotice = async (id) => {
  const response = await apiClient.get(`/notices/${id}`, { headers: getAuthHeader() });
  return response.data;
};

export const updateNotice = async (id, data) => {
  const response = await apiClient.put(`/notices/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const deleteNotice = async (id) => {
  const response = await apiClient.delete(`/notices/${id}`, { headers: getAuthHeader() });
  return response.data;
};
