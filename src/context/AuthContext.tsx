import { createContext, useContext } from 'react'

interface State {
  user: boolean
}

const AuthContext = createContext<State>({
  user: false
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('There is not Auth Provider')
  return context
}

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const user = true

  const value = {
    user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
