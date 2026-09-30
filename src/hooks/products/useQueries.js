import { getProducts } from "../../services/Product/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};