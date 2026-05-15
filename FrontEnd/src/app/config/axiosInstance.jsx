import axios from "axios";
import { setAccessToken, logout } from "../../features/auth/state/authSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});


// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use((config) => {
  if (store) {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});


// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post("/auth/refresh");

        const newAccessToken =
          response.data.data.accessToken;

        store.dispatch(setAccessToken(newAccessToken));

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (err) {
        store.dispatch(logout());

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);