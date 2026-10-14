import { getCartItems } from "../../services/cart";
import { getProductDetails, getProducts, getWishlist } from "../../services/Product/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

export const useGetProductDetails = (productId) => {
  return useQuery({
    queryKey: ['productDetails', productId],
    queryFn: () => getProductDetails(productId),
  });
};

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
  });
};

export const useGetCartItems = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItems(),
  });
};