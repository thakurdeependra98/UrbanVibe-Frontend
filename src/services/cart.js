import api from "../config/api";

export const getCartItems = async () => {
  const { data } = await api.get("/getCartItems");
  return data;
}

export const addToCart = async ({ productId, quantity = 1 }) => {
  const { data } = await api.post("/addToCart", { productId, quantity });
  return data;
};

export const removeFromCart = async (productId) => {
  const { data } = await api.delete(`/removeCartItem/${productId}`);
  return data;
}