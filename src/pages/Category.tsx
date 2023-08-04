import { useEffect, useState } from 'react'
import { SingleProduct } from '../components/SingleProduct.tsx'
import { CategoryFilters } from '../components/CategoryFilters.tsx'
import { useApi } from '../api/useApi.ts'
import { type ProductResponse } from '../interfaces/Product'
import { Select } from '../components/Select.tsx'
import { orderOptions } from '../constants/constants.tsx'

export const Category = () => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedOrder, setSelectedOrder] = useState({
    value: '',
    key: '',
    order: ''
  })
  const [selectedPrice, setSelectedPrice] = useState({ min: '', max: '' })
  const { getProductsByCategoryRequest } = useApi()

  const getProductsByCategory = async () => {
    await getProductsByCategoryRequest(
      selectedCategory,
      selectedOrder.key,
      selectedOrder.order,
      selectedPrice.min,
      selectedPrice.max
    )
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (selectedCategory) {
      void getProductsByCategory()
    }
  }, [selectedCategory, selectedOrder])

  return (
    <section className="component-box">
      <div className="flex justify-between items-start gap-5">
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedOrder={setSelectedOrder}
          setSelectedPrice={setSelectedPrice}
          getProductsByCategory={getProductsByCategory}
        />
        <div className="w-full">
          <section className="bg-white rounded-lg py-3 px-5 flex items-center justify-between gap-2 mb-4 flex-wrap">
            <div>awa</div>
            <section className="flex items-center justify-center gap-2 w-full max-w-[350px]">
              <span className="whitespace-nowrap">Ordenar por: </span>
              <Select
                options={orderOptions.map((option) => option.text)}
                value={selectedOrder.value}
                onChange={(option) => {
                  const order = orderOptions.find((op) => op.text === option)
                  setSelectedOrder({
                    value: order?.text as string,
                    key: order?.name as string,
                    order: order?.order as string
                  })
                }}
              />
            </section>
          </section>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-2.5">
            {products.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}
