import { useEffect, useMemo, useReducer } from 'react'
import { type Action, type StateUser, type User } from '../types'

const reducer = (state: StateUser, action: Action) => {
  const { type } = action

  if (type === 'CREATE_USER') {
    return {
      ...state,
      users: state.users.concat(action.payload)
    }
  }
  if (type === 'DELETE_USER') {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.payload)
    }
  }
  if (type === 'EDIT_USER') {
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.payload.id) {
        return {
          ...user,
          email: action.payload.email,
          name: action.payload.name,
          github: action.payload.github
        }
      }
      return user
    })
    return {
      ...state,
      users: updatedUsers
    }
  }

  return state
}

export const useUserStorage = () => {
  const storedData = useMemo(() => {
    return localStorage.getItem('_dataReducer')
  }, [])

  const initialState: StateUser = useMemo(() => {
    return storedData ? JSON.parse(storedData) : { users: [] }
  }, [storedData])

  const [{ users }, dispatch] = useReducer(reducer, initialState)

  const createUser = (payload: User) => {
    dispatch({ type: 'CREATE_USER', payload })
  }
  const deleteUser = (payload: string) => {
    dispatch({ type: 'DELETE_USER', payload })
  }
  const updateUser = (payload: User) => {
    dispatch({ type: 'EDIT_USER', payload })
    console.log('UDPATED')
  }

  useEffect(() => {
    localStorage.setItem('_dataReducer', JSON.stringify({ users }))
  }, [users])

  return { users, createUser, deleteUser, updateUser }
}
