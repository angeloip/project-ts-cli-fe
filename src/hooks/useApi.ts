import axios from 'axios'
import { type User } from '../interfaces/User'

const API_URL = 'http://localhost:5000/api'

export const useApi = () => {
  const registerRequest = async (user: User) =>
    await axios.post(`${API_URL}/auth/register`, user)

  return { registerRequest }
}
