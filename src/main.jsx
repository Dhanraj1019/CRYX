import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { path } from 'motion/react-client'
import Login from './components/Login/Login.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/home",
        element:<>
          <Home/>
        </>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/contect-us",
        element:<h1 className="text-white">contect-us</h1>
      },
      {
        path:"/about-us",
        element:<h1>helo</h1>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
