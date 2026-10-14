import api from "../../config/api"

export const categories = async () => {
  const { data } = await api.get(`/categories`)
  return data;
}