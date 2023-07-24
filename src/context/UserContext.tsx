import { createContext, useContext } from 'react'
import { type User } from '../types'
import { useUserStorage } from '../hooks/useUserStorage'

interface State {
  users: User[]
  createUser: (payload: User) => void
  deleteUser: (payload: string) => void
  updateUser: (payload: User) => void
}

const UserContext = createContext<State>({
  users: [],
  createUser: (_payload) => {},
  deleteUser: (_payload) => {},
  updateUser: () => {}
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('There is not User Provider')
  return context
}

interface Props {
  children: React.ReactNode
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const { users, createUser, deleteUser, updateUser } = useUserStorage()
  const value = {
    users,
    createUser,
    deleteUser,
    updateUser
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
