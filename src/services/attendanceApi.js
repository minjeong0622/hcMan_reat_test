import apiClient from '../axiosConfig';

// 외근(근태) 검색 (POST 방식)
export const searchAttendance = async (searchConditions) => {
  const response = await apiClient.post('/attendance', searchConditions);
  return response.data;
};

// ID로 단일 외근 조회 (GET 방식)
export const searchAttendanceById = async (id) => {
  const response = await apiClient.get(`/attendance/${id}`);
  return response.data;
};

// 외근(근태) 업데이트 (PUT 방식)
export const updateAttendance = async (attendanceData) => {
  await apiClient.put(`/attendance/${attendanceData.id}`, attendanceData);
};
