import { Outlet, createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Category } from '../pages/Category'
import { Navbar } from '../components/Navbar'

const HeaderLayout = () => (
  <>
    <Navbar />
    <Outlet />

  </>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/categoria', element: <Category /> }
    ]
  },
  {
    path: '*',
    element: <h1>Not Found</h1>
  }
])
