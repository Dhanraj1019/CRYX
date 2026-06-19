import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import UnderDevelopment from './components/UnderDevelopment.jsx'
import SignUp from './components/Login/SignUp.jsx'
import { Provider } from 'react-redux'
import { store } from '../store/store.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/contect-us",
        element: (
            <UnderDevelopment header="CONTECT US"/>
        )
      },
      {
        path: "/about-us",
        element: (
            <UnderDevelopment header="ABOUT US"/>
        )
      },
      {
        path:"/signup",
        element:<SignUp/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
