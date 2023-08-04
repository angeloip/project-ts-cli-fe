import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Toast } from '../helpers/toast'
import { useApi } from '../api/useApi'
import { type Order } from '../interfaces/Order'

export const Cart = () => {
  const {
    cart,
    quantity,
    total,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart
  } = useCart()
  const { user, token } = useAuth()
  const { createOrderRequest } = useApi()

  const checkout = async () => {
    if (quantity === 0) return Toast('info', 'No hay productos en el carrito')

    if (user) {
      const order: Order = {
        products: cart.map((product) => ({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          discountPercentage: product.discountPercentage,
          subtotal: product.price * product.quantity,
          category: product.category.id
        })),
        total,
        quantity,
        user: user._id as string
      }
      await createOrderRequest(order, token as string)
        .then((res) => {
          Toast('success', res.data.msg)
          clearCart()
        })
        .catch((err) => {
          Toast('error', err.response.data.msg)
        })
    } else {
      Toast('info', 'Debes iniciar sesión para continuar')
    }
  }

  return (
    <section className="component-box">
      <div className="grid gap-4">
        d
        <h1 className="py-3 px-5 bg-white rounded-lg font-medium text-xl">
          Mi Carrito ({quantity} productos)
        </h1>
        <div className="flex items-start gap-4 lg:flex-col">
          <section className="flex-1 grid gap-4 lg:w-full">
            {cart.map((product) => (
              <article
                key={product.id}
                className="flex items-center gap-4 py-3 px-5 rounded-lg bg-white relative"
              >
                <img
                  className="w-20 h-20 object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex-1 flex gap-4 700:flex-col">
                  <div className="w-44 grid gap-1">
                    <h3 className="font-medium leading-tight h-10 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.category.name}
                    </p>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex-2 flex items-center gap-4 500:flex-col">
                      <div className="flex-1 text-center">
                        <p className="font-medium text-gray-500">Precio</p>
                        <p>S/ {product.price}</p>
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-3 h-full">
                        <button
                          className="bg-indigo-500 rounded-full p-1 hover:bg-indigo-600 transition-colors text-white"
                          onClick={() => {
                            decreaseQuantity(product.id)
                          }}
                          disabled={product.quantity === 1}
                        >
                          <FaMinus size={17} />
                        </button>
                        <span className="font-bold">{product.quantity}</span>
                        <button
                          className="bg-indigo-500 rounded-full p-1 hover:bg-indigo-600 transition-colors text-white"
                          onClick={() => {
                            increaseQuantity(product.id)
                          }}
                          disabled={product.quantity === 10}
                        >
                          <FaPlus size={17} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col text-center">
                      <p className="font-medium text-gray-500">Subtotal</p>
                      <p>S/ {product.price * product.quantity}</p>
                    </div>
                  </div>
                </div>

                <button
                  className="text-xs px-2 py-2 bg-red-600 text-white font-medium rounded-md 700:absolute 700:top-0 700:right-0 700:mt-3 700:mr-5"
                  onClick={() => {
                    removeFromCart(product.id)
                  }}
                >
                  <FaTrash />
                </button>
              </article>
            ))}
          </section>
          <section className="flex flex-col gap-3 py-3 px-5 bg-white rounded-lg w-[350px] lg:w-full">
            <h2 className="text-xl font-bold">Resumen de compra</h2>
            <div className="py-3 border-y-gray-300 border-y flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Subtotal</p>
                <p className="text-gray-500">S/ {total}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Descuentos</p>
                <p className="text-gray-500">S/ 0</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-lg">
              <p className="font-bold">Total</p>
              <p className="font-bold">S/ {total}</p>
            </div>
            <button className="button-primary text-center" onClick={checkout}>
              Continuar compra
            </button>
          </section>
        </div>
      </div>
    </section>
  )
}
