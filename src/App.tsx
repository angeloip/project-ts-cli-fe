/* eslint-disable @typescript-eslint/space-before-function-paren */
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
