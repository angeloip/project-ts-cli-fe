import { useEffect, useState } from 'react'
import { useApi } from '../api/useApi'
import { useParams } from 'react-router-dom'
import { Toast } from '../helpers/toast'
import { type ProductResponse } from '../interfaces/Product'

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductResponse>({
    thumbnail: { url: '', public_id: '' },
    _id: '',
    name: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    category: { _id: '', name: '' },
    createdAt: new Date()
  })
  const { getProductRequest } = useApi()
  const { id } = useParams()

  const getProduct = async () => {
    await getProductRequest(id as string)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
  }

  useEffect(() => {
    void getProduct()
  }, [])

  return <div className="component-box">{product.name}</div>
}
