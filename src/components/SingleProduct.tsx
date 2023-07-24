import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { type Product } from '../types'

interface Props {
  product: Product
}

export const SingleProduct: React.FC<Props> = ({ product }) => {
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart()
  const productExists = cart.find((item) => item.id === product.id)

  const handleAddToCart = () => {
    const { id, title, price, category, description, thumbnail } = product
    const productToAdd = {
      id,
      name: title,
      price,
      category,
      description,
      image: thumbnail
    }
    addToCart(productToAdd)
  }

  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-5 object-cover w-full h-[200px] mx-auto"
          src={product.thumbnail}
          alt={product.title}
        />
      </a>
      <div className="px-5 pb-5 flex flex-col gap-5">
        <a href="#">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white h-[56px] line-clamp-2">
            {product.title}
          </h5>
        </a>
        <div className="flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {product.rating}
          </span>
        </div>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          ${product.price}
        </p>
        {productExists ? (
          <div className="flex items-center justify-center gap-3 text-white h-10">
            <button
              className="bg-indigo-500 rounded-full p-1.5 hover:bg-indigo-600 transition-colors"
              onClick={() => {
                decreaseQuantity(productExists.id)
              }}
              disabled={productExists.quantity === 1}
            >
              <FaMinus size={20} />
            </button>
            <span className="text-xl font-bold">{productExists.quantity}</span>
            <button
              className="bg-indigo-500 rounded-full p-1.5 hover:bg-indigo-600 transition-colors"
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
