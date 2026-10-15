import axios from "axios";
const Backend_API = import.meta.env.VITE_BACKEND_URL;

export const backendOrigin = Backend_API
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

console.log("Backend Origin:", backendOrigin);

const api = axios.create({
  baseURL: Backend_API,
  withCredentials: true,
  timeout: 3000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
