import api from "../config/api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
}

export const loginUser = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  return data;
}

export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
}


export const getAuthSession = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("isLoggedIn");
    return user ? { user, token } : null;
  } catch {
    return null;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
};