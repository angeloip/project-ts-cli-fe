import { type User, type AuthAction, type AuthState, type Avatar } from '../interfaces/User'
import { useReducer } from 'react'

const reducer = (state: AuthState, action: AuthAction) => {
  const { type } = action
  if (type === 'SIGNIN') {
    return {
      ...state,
      isLoggedIn: action.payload
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

  const signIn = (payload: boolean) => {
    dispatch({ type: 'SIGNIN', payload })
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
    dispatch({ type: 'LOGOUT' })
  }

  const [{ isLoggedIn, token, user }, dispatch] = useReducer(reducer, INITIAL_STATE)

  return { isLoggedIn, token, user, signIn, getToken, getUser, updateAvatar, logout }
}
