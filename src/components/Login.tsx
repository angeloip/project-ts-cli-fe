import { FaXmark } from 'react-icons/fa6'
import { Modal } from './Modal'
import { Input } from './Input'
import { useState } from 'react'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
}

export const Login: React.FC<Props> = ({ show, setShow }) => {
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
    >
      <div className="flex flex-col gap-4">
        <header className="flex items-center justify-between border-b-gray-300 pb-3 border-b">
          <h2 className="text-2xl font-bold">
            {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
          </h2>
          <button
            className="text-3xl text-gray-500"
            onClick={() => {
              setShow(false)
            }}
          >
            <FaXmark />
          </button>
        </header>
        <main>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {isRegister && <Input text="Nombre" name="name" />}
            <Input text="Email" name="email" />
            <Input text="Contraseña" name="password" />
            <button type="submit" className="button-primary">
              {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
          </form>
        </main>
        <footer>
          <p className="text-center">
            {isRegister ? (
              <>
                ¿Ya tienes cuenta?{' '}
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setIsRegister(false)
                  }}
                >
                  Inicia Sesión
                </button>
              </>
            ) : (
              <>
                ¿No tienes cuenta?{' '}
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setIsRegister(true)
                  }}
                >
                  Registrate
                </button>
              </>
            )}
          </p>
        </footer>
      </div>
    </Modal>
  )
}
