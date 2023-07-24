import { createContext, useContext } from 'react'
import { useCartStorage } from '../hooks/useCartStorage'
import { type Cart, type CartID } from '../types'

interface State {
  cart: Cart[]
  quantity: number
  total: number
  addToCart: (payload: Omit<Cart, 'quantity'>) => void
  removeFromCart: (payload: CartID) => void
  clearCart: () => void
  increaseQuantity: (payload: CartID) => void
  decreaseQuantity: (payload: CartID) => void
}

const CartContext = createContext<State>({
  cart: [],
  quantity: 0,
  total: 0,
  addToCart: (_payload) => {},
  removeFromCart: (_payload) => {},
  clearCart: () => {},
  increaseQuantity: (_payload) => {},
  decreaseQuantity: (_payload) => {}
})

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('There is not Cart Provider')
  return context
}

interface Props {
  children: React.ReactNode
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const {
    cart,
    quantity,
    total,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCartStorage()

  const value = {
    cart,
    quantity,
    total,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
