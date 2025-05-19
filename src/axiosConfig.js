// src/axiosConfig.js
import axios from "axios";
import { notify } from "./services/NotificationService";

// 환경변수 REACT_APP_API_BASE_URL 값 사용 (빌드 시점에 자동 결정됨)
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // 환경변수에 따른 API 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 (Authorization 헤더 추가)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 네트워크 오류나 5xx 에러 시 전역 알림 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      notify("서버에 연결할 수 없습니다. 관리자에게 문의하세요.", "error");
    } else if (error.response.status >= 500) {
      notify(
        "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        "error"
      );
    }
    return Promise.reject(error);
  }
);

export default apiClient;
