import axios from "axios";
import { clearTokens, getTokens, setTokens } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const tokens = getTokens();

  if (tokens?.access_token) {
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
  }

  // Axios sets Content-Type to multipart/form-data automatically for FormData
  // We just ensure we don't override it if it's already set or needed

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      const tokens = getTokens();
      if (!tokens?.refresh_token) {
        clearTokens();
        return Promise.reject(error);
      }
      try {
        const refreshResp = await api.post("/auth/refresh", {
          refresh_token: tokens.refresh_token,
        });
        const newTokens = refreshResp.data;
        setTokens(newTokens);
        originalRequest.headers["Authorization"] = `Bearer ${newTokens.access_token}`;
        return api(originalRequest);
      } catch (refreshErr) {
        clearTokens();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

