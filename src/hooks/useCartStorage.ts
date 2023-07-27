import { useReducer, useMemo, useEffect } from 'react'
import {
  type Cart,
  type CartAction,
  type CartID,
  type CartState
} from '../types'

const reducer = (state: CartState, action: CartAction) => {
  const { type } = action
  if (type === 'ADD_TO_CART') {
    const updatedCart = [...state.cart, { ...action.payload, quantity: 1 }]
    const updatedTotal = updatedCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )

    return {
      ...state,
      cart: updatedCart,
      quantity: state.quantity + 1,
      total: updatedTotal
    }
  }
  if (type === 'REMOVE_FROM_CART') {
    const updatedCart = state.cart.filter(
      (product) => product.id !== action.payload
    )
    const updatedTotal = updatedCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )

    return {
      ...state,
      cart: updatedCart,
      quantity: state.quantity - 1,
      total: updatedTotal
    }
  }
  if (type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
      quantity: 0,
      total: 0
    }
  }
  if (type === 'INCREASE_QUANTITY') {
    const updatedCart = state.cart.map((product) =>
      product.id === action.payload
        ? {
            ...product,
            quantity: product.quantity + (product.quantity < 10 ? 1 : 0)
          }
        : product
    )
    const updatedTotal = updatedCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    return {
      ...state,
      cart: updatedCart,
      total: updatedTotal
    }
  }
  if (type === 'DECREASE_QUANTITY') {
    const updatedCart = state.cart.map((product) =>
      product.id === action.payload
        ? {
            ...product,
            quantity: product.quantity - (product.quantity === 1 ? 0 : 1)
          }
        : product
    )
    const updatedTotal = updatedCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    return {
      ...state,
      cart: updatedCart,
      total: updatedTotal
    }
  }
  return state
}

export const useCartStorage = () => {
  const storedData = useMemo(() => {
    return localStorage.getItem('_cart')
  }, [])

  const initialState: CartState = useMemo(() => {
    return storedData
      ? JSON.parse(storedData)
      : { cart: [], quantity: 0, total: 0 }
  }, [storedData])

  const [{ cart, quantity, total }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const addToCart = (payload: Omit<Cart, 'quantity'>) => {
    dispatch({ type: 'ADD_TO_CART', payload })
  }
  const removeFromCart = (payload: CartID) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload })
  }
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  const increaseQuantity = (payload: CartID) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload })
  }
  const decreaseQuantity = (payload: CartID) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload })
  }

  useEffect(() => {
    localStorage.setItem('_cart', JSON.stringify({ cart, quantity, total }))
  }, [cart])

  return {
    cart,
    quantity,
    total,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  }
}
