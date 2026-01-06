import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // adjust if backend port differs
  withCredentials: true, // important for cookie-based auth
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
