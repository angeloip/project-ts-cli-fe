import axios from '../config/axios'
import { type CategoryResponse } from '../interfaces/Category'
import { type ProductResponse } from '../interfaces/Product'
import { type User } from '../interfaces/User'

export const useApi = () => {
  const registerRequest = async (user: User) =>
    await axios.post('/auth/register', user)

  const loginRequest = async (user: User) =>
    await axios.post('/auth/login', user)

  const accessTokenRequest = async () => await axios.post('/auth/access')

  const logoutRequest = async () => await axios.post('/auth/logout')

  const getCategoriesRequest = async () =>
    await axios.get<CategoryResponse[]>('/category')

  const getProductsByCategoryRequest = async (
    category: string,
    key: string,
    order: string,
    min: string,
    max: string
  ) =>
    await axios.post<ProductResponse[]>(
      `/product/category?name=${category}&key=${key}&order=${order}&min=${min}&max=${max}`
    )

  return {
    registerRequest,
    loginRequest,
    accessTokenRequest,
    logoutRequest,
    getCategoriesRequest,
    getProductsByCategoryRequest
  }
}
