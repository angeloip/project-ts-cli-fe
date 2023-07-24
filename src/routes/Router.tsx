import { Outlet, createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { EditUser } from '../components/EditUser'
import { Category } from '../pages/Category'
import { Navbar } from '../components/Navbar'

const HeaderLayout = () => (
  <>
    <Navbar />
    <br />
    <br />

    <div className="max-w-[1250px] mx-auto px-2">
      <Outlet />
    </div>
  </>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/edit/:id', element: <EditUser /> },
      { path: '/categoria', element: <Category /> }
    ]
  },
  {
    path: '*',
    element: <h1>Not Found</h1>
  }
])
