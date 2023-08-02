import {
  type User,
  type AuthAction,
  type AuthState,
  type Avatar
} from '../interfaces/User'
import { useReducer } from 'react'

const reducer = (state: AuthState, action: AuthAction) => {
  const { type } = action
  if (type === 'LOGIN') {
    return {
      ...state,
      isLoggedIn: true
    }
  }
  if (type === 'GET_TOKEN') {
    return {
      ...state,
      token: action.payload
    }
  }
  if (type === 'GET_USER') {
    return {
      ...state,
      user: action.payload
    }
  }
  if (type === 'UPDATE_AVATAR') {
    if (state.user === null) {
      return state
    }
    return {
      ...state,
      user: {
        ...state.user,
        avatar: {
          ...state.user.avatar,
          url: action.payload.url,
          public_id: action.payload.public_id
        }
      }
    }
  }
  if (type === 'LOGOUT') {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
      user: null
    }
  }

  return state
}

export const useAuthStorage = () => {
  const INITIAL_STATE: AuthState = {
    user: null,
    isLoggedIn: false,
    token: ''
  }

  const login = () => {
    localStorage.setItem('_signing', 'true')
    dispatch({ type: 'LOGIN' })
  }

  const getToken = (payload: string) => {
    dispatch({ type: 'GET_TOKEN', payload })
  }

  const getUser = (payload: User) => {
    dispatch({ type: 'GET_USER', payload })
  }

  const updateAvatar = (payload: Avatar) => {
    dispatch({ type: 'UPDATE_AVATAR', payload })
  }

  const logout = () => {
    localStorage.removeItem('_signing')
    dispatch({ type: 'LOGOUT' })
  }

  const [{ isLoggedIn, token, user }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  )

  return {
    user,
    isLoggedIn,
    token,
    login,
    getToken,
    getUser,
    updateAvatar,
    logout
  }
}
