import axios from "axios";
const Backend_API = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: Backend_API,
  withCredentials: true,
  timeout: 3000,
});

export default api;