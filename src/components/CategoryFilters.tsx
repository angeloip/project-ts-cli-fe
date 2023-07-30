import { useApi } from '../api/useApi'
import { type CategoryResponse } from '../interfaces/Category'
import { RadioGroup } from './RadioGroup'
import { useState, useEffect } from 'react'

interface Props {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const CategoryFilters: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory
}) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const { getCategoriesRequest } = useApi()

  const getCategories = async () => {
    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data)
        setSelectedCategory(res.data[0].name)
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
      <h2 className="text-2xl font-medium border-b border-b-gray-300">
        Filtros
      </h2>
      <RadioGroup
        options={categories.map((category) => category.name)}
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value)
        }}
      />
    </section>
  )
}
