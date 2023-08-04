export interface Order {
  products: Product[]
  total: number
  quantity: number
  user: string
}

export interface Product {
  name: string
  price: number
  quantity: number
  discountPercentage: number
  subtotal: number
  category: string
}
