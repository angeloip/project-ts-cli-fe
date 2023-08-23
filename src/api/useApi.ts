import axios from '../config/axios'
import { type CategoryResponse } from '../interfaces/Category'
import { type Order } from '../interfaces/Order'
import { type ProductResponse } from '../interfaces/Product'
import { type User } from '../interfaces/User'

export const useApi = () => {
  const registerRequest = async (user: User) =>
    await axios.post('/auth/register', user)

  const loginRequest = async (user: Omit<User, 'name'>) =>
    await axios.post('/auth/login', user)

  const accessTokenRequest = async () => await axios.post('/auth/access')

  const getUserAuthRequest = async (token: string) =>
    await axios.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

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
    await axios.get<ProductResponse[]>(
      `/product/category/filter?name=${category}&key=${key}&order=${order}&min=${min}&max=${max}`
    )

  const getProductRequest = async (id: string) =>
    await axios.get(`/product/${id}`)

  const createOrderRequest = async (order: Order, token: string) =>
    await axios.post('/order', order, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  return {
    registerRequest,
    loginRequest,
    getUserAuthRequest,
    accessTokenRequest,
    logoutRequest,
    getCategoriesRequest,
    getProductsByCategoryRequest,
    getProductRequest,
    createOrderRequest
  }
}
