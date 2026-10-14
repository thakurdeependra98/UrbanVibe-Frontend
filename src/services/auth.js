import api from "../config/api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
}

export const loginUser = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  return data;
}

export const saveAuthSession = (response) => {
  const payload = response?.data || response;
  const user = payload?.user || payload?.data?.user || payload;
  const token = payload?.token || payload?.accessToken || payload?.data?.token;

  localStorage.setItem("urbanvibe-user", JSON.stringify(user));
  if (token) localStorage.setItem("urbanvibe-token", token);

  return user;
};

export const getAuthSession = () => {
  try {
    const user = JSON.parse(localStorage.getItem("urbanvibe-user"));
    const token = localStorage.getItem("urbanvibe-token");
    return user ? { user, token } : null;
  } catch {
    return null;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("urbanvibe-user");
  localStorage.removeItem("urbanvibe-token");
};