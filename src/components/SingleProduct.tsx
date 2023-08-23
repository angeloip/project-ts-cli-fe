import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { type ProductResponse } from '../interfaces/Product'
import { Link } from 'react-router-dom'
import { slugify } from '../helpers/slugify'

interface Props {
  product: ProductResponse
}

export const SingleProduct: React.FC<Props> = ({ product }) => {
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart()
  const productExists = cart.find((item) => item.id === product._id)

  const handleAddToCart = () => {
    const {
      _id,
      name,
      price,
      discountPercentage,
      category,
      thumbnail: { url }
    } = product
    const productToAdd = {
      id: _id,
      name,
      price,
      discountPercentage,
      category: {
        id: category._id,
        name: category.name
      },
      image: url
    }
    addToCart(productToAdd)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Link to={`/detalles/${slugify(product.name)}/${product._id}`}>
        <figure className="p-5 h-[200px]">
          <img
            className="object-cover w-full h-full mx-auto shadow-lg rounded"
            src={product.thumbnail.url}
            alt={product.name}
          />
        </figure>
      </Link>
      <div className="px-5 pb-5 flex flex-col gap-5">
        <a href="#">
          <h5 className="text-lg font-semibold text-gray-900 h-[56px] line-clamp-2">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center">
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {product.rating}
          </span>
        </div>
        <p className="text-xl font-bold text-gray-900">S/ {product.price}</p>
        {productExists ? (
          <div className="flex items-center justify-center gap-3 h-10">
            <button
              className="bg-indigo-500 rounded-full p-1.5 hover:bg-indigo-600 transition-colors text-white"
              onClick={() => {
                decreaseQuantity(productExists.id)
              }}
              disabled={productExists.quantity === 1}
            >
              <FaMinus size={20} />
            </button>
            <span className="text-xl font-bold">{productExists.quantity}</span>
            <button
              className="bg-indigo-500 rounded-full p-1.5 hover:bg-indigo-600 transition-colors text-white"
              onClick={() => {
                increaseQuantity(productExists.id)
              }}
              disabled={productExists.quantity === 10}
            >
              <FaPlus size={20} />
            </button>
          </div>
        ) : (
          <button
            className="w-full button-primary flex gap-2 items-center justify-center"
            onClick={handleAddToCart}
          >
            <FaCartPlus size={20} />
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  )
}
