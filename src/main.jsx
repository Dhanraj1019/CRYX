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
import AddMember from './components/Forms/AddMember.jsx'
import AddEvent from './components/Forms/AddEvent.jsx'
import Loader from './components/Loader.jsx'
import AdminProtect from './components/Protected/AdminProtect.jsx'
import UserProtect from './components/Protected/UserProtect.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/home" replace />
      // },
      {
        path: "/home",
        element: <UserProtect authentication={false}>
           <Home />
        </UserProtect>
      },
      {
        path: "/login",
        element: <UserProtect authentication={false}>
          <Login />
        </UserProtect>
      },
      {
        path: "/contect-us",
        element: (
            <UserProtect authentication={false}>
              <UnderDevelopment header="CONTECT US"/>
            </UserProtect>
        )
      },
      {
        path: "/about-us",
        element: (
            <UserProtect authentication={false}>
              <UnderDevelopment header="ABOUT US"/>
            </UserProtect>
        )
      },
      {
        path:"/signup",
        element:<UserProtect authentication={true}>
          <SignUp/>
        </UserProtect>
      },{
        path:"/add-member",
        element:<AdminProtect authentication={true}>
          <AddMember/>
        </AdminProtect>
      },
      {
        path:"/add-event",
        element:<AdminProtect authentication={true}>
          <AddEvent/>
        </AdminProtect>
      },
      {
        path:"/loader",
        element:<div className="flex justify-center items-center min-h-lvh">
            <Loader />
          </div>
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
