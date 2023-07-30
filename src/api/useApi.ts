import axios from '../config/axios'
import { type CategoryResponse } from '../interfaces/Category'
import { type ProductResponse } from '../interfaces/Product'
import { type User } from '../interfaces/User'

export const useApi = () => {
  const registerRequest = async (user: User) =>
    await axios.post('/auth/register', user)

  const getCategoriesRequest = async () =>
    await axios.get<CategoryResponse[]>('/category')

  const getProductsByCategoryRequest = async (category: string) =>
    await axios.post<ProductResponse[]>(`/product/category?name=${category}`)

  return { registerRequest, getCategoriesRequest, getProductsByCategoryRequest }
}
