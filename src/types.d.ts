export interface CartState {
  cart: Cart[]
  quantity: number
  total: number
}

export interface Cart {
  id: CartID
  name: string
  price: number
  quantity: number
  category: string
  description: string
  image: string
}

type CartID = string | number

export type CartAction =
  | { type: 'ADD_TO_CART', payload: Omit<Cart, 'quantity'> }
  | { type: 'REMOVE_FROM_CART', payload: CartID }
  | { type: 'CLEAR_CART' }
  | { type: 'INCREASE_QUANTITY', payload: CartID }
  | { type: 'DECREASE_QUANTITY', payload: CartID }
