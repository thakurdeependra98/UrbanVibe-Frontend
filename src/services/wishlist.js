import api from "../config/api";

export const getWishlist = async () => {
  const { data } = await api.get("/getWishlist");
  return data;
};

export const addToWishlist = async (productId) => {
  const { data } = await api.post("/addWishlist", { productId });
  return data;
};

export const removeFromWishlist = async (productId) => {
  const { data } = await api.delete("/removeWishlist", { data: { productId } });
  return data;
};