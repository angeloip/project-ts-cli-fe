export interface Auth {
  email: string
  password: string
}

export interface User extends Auth {
  _id?: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}
