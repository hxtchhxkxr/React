import axios from "axios";
import { getAccessToken, clearTokens } from "./token";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

// 요청 인터셉터: 서버로 보내기 전에 토큰 첨부
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 여기부터 추가
const TOKEN_ERROR_CODES = ["UNAUTHORIZED", "EXPIRED_TOKEN", "INVALID_TOKEN"];

// 응답 인터셉터: 토큰 문제로 401이 오면 토큰 삭제 후 로그인으로 이동
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const code = error.response.data?.code;

      if (TOKEN_ERROR_CODES.includes(code)) {
        clearTokens();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
