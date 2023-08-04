import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Category } from '../pages/Category'
import { ProductDetails } from '../pages/ProductDetails'
import { Cart } from '../pages/Cart'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categoria" element={<Category />} />
      <Route path="/detalles/:slug/:id" element={<ProductDetails />} />
      <Route path="/mi-carrito" element={<Cart />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}
