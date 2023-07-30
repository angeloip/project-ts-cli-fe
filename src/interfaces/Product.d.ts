export interface ProductResponse {
  thumbnail: Thumbnail
  _id: string
  name: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  category: Category
  createdAt: Date
}

export interface Category {
  _id: string
  name: string
}

export interface Thumbnail {
  url: string
  public_id: string
}
