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

export const deleteProduct = async (productId) => {
  const { data } = await api.delete(`/deleteProduct/${productId}`);
  return data;
};

// Seller product creation
export const createProduct = async (productData) => {
  const { data } = await api.post("/createProduct", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};