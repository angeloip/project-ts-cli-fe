import { createContext, useContext, useEffect } from 'react'
import { useApi } from '../api/useApi'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { Toast } from '../helpers/toast'
import { type Avatar, type User } from '../interfaces/User'

interface State {
  user: User | null
  token: string | null
  login: () => void
  updateAvatar: (payload: Avatar) => void
  logout: () => void
}

const AuthContext = createContext<State>({
  user: null,
  token: null,
  login: () => {},
  updateAvatar: () => {},
  logout: () => {}
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
  const { accessTokenRequest, getUserAuthRequest } = useApi()
  const {
    user,
    isLoggedIn,
    token,
    login,
    getToken,
    getUser,
    updateAvatar,
    logout
  } = useAuthStorage()

  const accessToken = async () => {
    await accessTokenRequest()
      .then((res) => {
        getToken(res.data.ac_token)
      })
      .catch((err) => {
        logout()
        Toast('info', err.response.data.msg)
      })
  }

  const getUserAuth = async () => {
    await getUserAuthRequest(token)
      .then((res) => {
        getUser(res.data)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
  }

  useEffect(() => {
    const _appSigning = localStorage.getItem('_signing')
    if (_appSigning) {
      void accessToken()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (token) {
      void getUserAuth()
    }
  }, [token])

  const value = {
    user,
    token,
    login,
    updateAvatar,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
