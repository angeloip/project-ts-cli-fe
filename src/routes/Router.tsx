import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Category } from '../pages/Category'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categoria" element={<Category />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}
