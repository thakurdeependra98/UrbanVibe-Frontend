import { useQuery } from "@tanstack/react-query"
import { categories } from "../../services/Category/category"

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => categories(),
  });
};