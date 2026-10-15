import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../../services/auth"

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
};