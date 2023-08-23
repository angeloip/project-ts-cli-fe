import { useApi } from '../api/useApi'
import { type CategoryResponse } from '../interfaces/Category'
import { DoubleRangeSlider } from './DoubleRangeSlider'
import { RadioGroup } from './RadioGroup'
import { useState, useEffect } from 'react'

interface Props {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  setSelectedOrder: (order: {
    value: string
    key: string
    order: string
  }) => void
  setSelectedPrice: (price: { min: string, max: string }) => void
  getProductsByCategory: () => void
}

export const CategoryFilters: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedOrder,
  setSelectedPrice,
  getProductsByCategory
}) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { getCategoriesRequest } = useApi()

  const getCategories = async () => {
    setIsLoading(true)
    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data)
        setSelectedCategory(res.data[0].name)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    void getCategories()
  }, [])

  return (
    <section className="w-full max-w-[300px] bg-white rounded-lg py-3 px-5 flex flex-col gap-3">
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <div className="w-full h-5 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-full h-5 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-full h-5 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-full h-5 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-medium border-b border-b-gray-300 pb-3">
            Filtros
          </h2>
          <RadioGroup
            options={categories.map((category) => category.name)}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSelectedOrder({ value: '', key: '', order: '' })
            }}
          />
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-medium border-b border-b-gray-300 pb-3">
              Gama de Precios
            </h2>
            <DoubleRangeSlider
              min={0}
              max={2000}
              initialMax={2000}
              gap={200}
              onChange={(min, max) => {
                setSelectedPrice({ min: min.toString(), max: max.toString() })
              }}
            />
            <button
              className="button-primary w-full mt-2"
              onClick={getProductsByCategory}
            >
              Aplicar filtro
            </button>
          </section>
        </>
      )}
    </section>
  )
}
