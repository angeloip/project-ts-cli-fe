import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect, useRef, useState } from 'react'
import { CartBox } from './CartBox'
import { Login } from './Login'
import { useAuth } from '../context/AuthContext'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'

export const Navbar = () => {
  const { quantity } = useCart()
  const [showCart, setShowCart] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { user, logout } = useAuth()
  const { logoutRequest } = useApi()

  const signout = async () => {
    await logoutRequest()
      .then((res) => {
        logout()
        Toast('success', res.data.msg)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
  }

  useEffect(() => {
    const handleScroll = () => {
      ref.current?.classList.toggle('bg-white', window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      ref={ref}
      className="fixed w-full h-[75px] shadow-md transition-[background-color] z-50"
    >
      <div className="h-full flex items-center justify-between px-5">
        <section>
          <h1 className="text-3xl font-bold">Project-TS</h1>
        </section>
        <section>
          <ul className="flex items-center gap-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categoria">Categorías</Link>
            </li>
          </ul>
        </section>
        <section className="flex gap-3">
          {user ? (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <button className="button-primary" onClick={signout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button
                className="button-primary"
                onClick={() => {
                  setShowLogin(true)
                }}
              >
                Iniciar Sesión
              </button>
            </>
          )}
          <button
            className="text-2xl relative"
            onClick={() => {
              setShowCart(true)
            }}
          >
            <FaShoppingCart />
            <div className="absolute flex items-center justify-center p-1 h-6 min-w-[24px] text-xs font-bold text-white bg-indigo-500 rounded-full -top-2 -right-2">
              {quantity}
            </div>
          </button>
          <CartBox show={showCart} setShow={setShowCart} />
        </section>
      </div>
      <Login show={showLogin} setShow={setShowLogin} />
    </nav>
  )
}
