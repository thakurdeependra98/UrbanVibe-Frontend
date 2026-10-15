import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../services/cart";

export const useGetCartItems = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItems(),
  });
};