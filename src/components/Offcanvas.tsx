import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  show?: boolean
  onHide?: (show: boolean) => void
  children?: React.ReactNode
}

export const Offcanvas: React.FC<Props> = ({ show, onHide, children }) => {
  const containerEl = useMemo(() => {
    const newDiv = document.createElement('div')
    newDiv.setAttribute('id', 'offcanvas')
    return newDiv
  }, [])

  useEffect(() => {
    if (show) {
      document.body.appendChild(containerEl)
      document.body.style.overflow = 'hidden'
    }
    if (document.body.contains(containerEl) && !show) {
      setTimeout(() => {
        document.body.removeChild(containerEl)
        document.body.style.overflow = 'auto'
      }, 300)
    }
  }, [show])

  useEffect(() => {
    return () => {
      if (document.body.contains(containerEl)) {
        document.body.removeChild(containerEl)
        document.body.style.overflow = 'auto'
      }
    }
  }, [])

  return createPortal(
    <section
      className={`${
        show ? 'fade-in' : 'fade-out'
      } fixed top-0 left-0 z-[1000] min-h-screen w-full bg-black/[0.6]`}
      onClick={() => {
        onHide?.(false)
      }}
    >
      <section
        className={`${
          show ? 'translate-in' : 'translate-out'
        } fixed top-0 right-0 bg-white p-4 rounded-lg h-screen w-25 duration-300 w-full max-w-[500px]`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </section>
    </section>,
    containerEl
  )
}
