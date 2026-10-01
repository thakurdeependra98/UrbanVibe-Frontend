import api from "../config/api";

export const getCartItems = async () => {
  const { data } = await api.get("/getCartItems");
  return data;
}