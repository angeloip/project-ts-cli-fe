export interface Auth {
  email: string
  password?: string
}

export interface User extends Auth {
  _id?: string
  name: string
  avatar?: Avatar
  createdAt?: Date
}

export interface Avatar {
  url: string
  public_id: string
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  token: string
}

export type AuthAction =
  | { type: 'LOGIN' }
  | { type: 'GET_TOKEN', payload: string }
  | { type: 'GET_USER', payload: User }
  | { type: 'UPDATE_AVATAR', payload: Avatar }
  | { type: 'LOGOUT' }
