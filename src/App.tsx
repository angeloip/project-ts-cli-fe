import { Router } from './routes/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      <Navbar />
      <Router />
    </>
  )
}

export default App
