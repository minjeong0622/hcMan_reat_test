// src/services/itemApi.js
import apiClient from '../axiosConfig';

export const fetchItems = async () => {
  const res = await apiClient.get('/items');
  return res.data;
};

export const createItem = async (itemData) => {
  return await apiClient.post('/items', itemData);
};

export const updateItem = async (id, itemData) => {
  return await apiClient.put(`/items/${id}`, itemData);
};

export const deleteItem = async (id) => {
  return await apiClient.delete(`/items/${id}`);
};

// searchItems 함수 추가 (검색어에 따른 품목 조회)
export const searchItems = async (query) => {
  // 백엔드에서 검색 기능을 제공하는 경우, 아래처럼 API 호출
  // const res = await apiClient.get(`/items/search?itemName=${encodeURIComponent(query)}`);
  // return res.data;

  // 만약 검색 API가 없다면, fetchItems 후 클라이언트에서 필터링 (예시)
  const allItems = await fetchItems();
  if (!query) {
    return allItems;
  }
  return allItems.filter((item) =>
    item.itemName.toLowerCase().includes(query.toLowerCase())
  );
};
