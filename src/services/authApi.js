import axios from "axios";

// 환경변수에 따라 API 기본 URL 사용 (예: http://localhost:8081/api 또는 http://mt.barom.net/api)
// 기본 URL에 "/auth"를 추가하여 로그인 관련 엔드포인트를 구성합니다.
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/auth`;

// 로그인 API 호출
export const loginUser = async (username, password) => {
  return await axios.post(`${API_BASE_URL}/login`, { username, password });
};

// 로그아웃 API 호출 (선택적)
export const logoutUser = () => {
  localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
};
