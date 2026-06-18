import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { path } from 'motion/react-client'
import Terminal from './components/Terminal/Terminal.jsx'
import Login from './components/Login/Login.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/home",
        element:<h1 className='text-white'>Hello </h1>
      },
      {
        path:"/login",
        element:<Login/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
