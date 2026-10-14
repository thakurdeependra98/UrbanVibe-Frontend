import api from "../../config/api";

export const getProducts = async (params) => {
  const query = params && params !== "all" ? { category: params } : undefined;
  const { data } = await api.get("/products", { params: query });
  return data;
};

export const getProductDetails = async (productId) => {
  const { data } = await api.get(`/products/${productId}`);
  return data;
};

export const getWishlist = async () => {
  const { data } = await api.get("/getWishlist");
  return data;
};

export const addToCart = async ({ productId, quantity = 1 }) => {
  const { data } = await api.post("/addToCart", { productId, quantity });
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

export const deleteProduct = async (productId) => {
  const { data } = await api.delete(`/deleteProduct/${productId}`);
  return data;
};