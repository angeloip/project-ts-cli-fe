import { Offcanvas } from './Offcanvas'
import { useCart } from '../context/CartContext'
import { FaXmark } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
}

export const CartBox: React.FC<Props> = ({ show, setShow }) => {
  const { cart, quantity, total, removeFromCart } = useCart()
  return (
    <Offcanvas
      show={show}
      onHide={() => {
        setShow(false)
      }}
    >
      <div className="flex flex-col gap-4 h-full">
        <header className="flex items-center justify-between border-b-gray-300 pb-3 border-b">
          <h2 className="text-2xl font-bold">Mi carrito ({quantity})</h2>
          <button
            className="text-3xl text-gray-500"
            onClick={() => {
              setShow(false)
            }}
          >
            <FaXmark />
          </button>
        </header>
        <main className="flex-1 py-3">
          <section className="flex flex-col gap-3">
            {cart.map((product) => (
              <article key={product.id} className="flex items-center gap-4">
                <img
                  className="w-16 h-16 object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${product.price} x {product.quantity}
                  </p>
                </div>
                <button
                  className="text-base px-3 py-3 bg-red-600 text-white font-bold rounded-md"
                  onClick={() => {
                    removeFromCart(product.id)
                  }}
                >
                  <FaTrash />
                </button>
              </article>
            ))}
          </section>
        </main>
        <footer className="flex flex-col gap-3 border-t-gray-300 pt-3 border-t">
          <div className="flex items-center justify-between text-xl">
            <p className="font-bold">Total</p>
            <p className="font-bold">$ {total}</p>
          </div>
          <button className="button-primary w-full">Mi carrito</button>
        </footer>
      </div>
    </Offcanvas>
  )
}
