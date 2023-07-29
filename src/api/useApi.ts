import axios from '../config/axios'
import { type CategoryResponse } from '../interfaces/Category'
import { type User } from '../interfaces/User'

export const useApi = () => {
  const registerRequest = async (user: User) =>
    await axios.post('/auth/register', user)

  const getCategoriesRequest = async () =>
    await axios.get<CategoryResponse[]>('/category')

  return { registerRequest, getCategoriesRequest }
}
