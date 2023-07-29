import { useEffect, useState } from 'react'
import { data } from '../data.ts'
import { type Product } from '../types'
import { SingleProduct } from '../components/SingleProduct.tsx'
import { CategoryFilters } from '../components/CategoryFilters.tsx'

export const Category = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(data)
  }, [])

  return (
    <section className="component-box">
      <div className="flex justify-between items-start gap-5">
        <CategoryFilters />
        <div className="w-full">
          <section className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-2.5">
            {products.map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}
