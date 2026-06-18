import { useState } from 'react'
import BinaryBg from './components/BinaryBg'
import './App.css'
import Terminal from './components/Terminal/Terminal'
// import NavBar from './components/AppBar/NavBar'
import AppBar from './components/AppBar/AppBar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
      <BinaryBg/>
      <AppBar/>
      <div className='h-18'></div>
      <div>
        <Outlet/>
      </div>
      <div className='h-18'></div>
      <Footer/>
    </>
  )
}

export default App
