import { useEffect, useState } from 'react'
import { data } from '../data.ts'
import { type Product } from '../types'
import { SingleProduct } from '../components/SingleProduct.tsx'

export const Category = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(data)
  }, [])

  return (
    <div>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-2.5">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
