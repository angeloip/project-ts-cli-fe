import { useEffect, useState } from 'react'
import { SingleProduct } from '../components/SingleProduct.tsx'
import { CategoryFilters } from '../components/CategoryFilters.tsx'
import { useApi } from '../api/useApi.ts'
import { type ProductResponse } from '../interfaces/Product'

export const Category = () => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const { getProductsByCategoryRequest } = useApi()

  const getProductsByCategory = async () => {
    await getProductsByCategoryRequest(selectedCategory)
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (selectedCategory) void getProductsByCategory()
  }, [selectedCategory])

  return (
    <section className="component-box">
      <div className="flex justify-between items-start gap-5">
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="w-full">
          <section className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-2.5">
            {products.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}
